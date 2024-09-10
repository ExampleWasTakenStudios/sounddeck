import { Page, SimplifiedPlaylist, User } from '@spotify/web-api-ts-sdk';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../../components/button/PrimaryButton';
import { PlaylistItem } from '../../components/list-items/PlaylistItem';
import { Navbar } from '../../components/navbar/Navbar';
import { RouteHeading } from '../../components/route-heading/RouteHeading';
import { BasicSpinner } from '../../components/spinners/BasicSpinner';
import { EmptyState } from '../../EmptyState';
import { useSpotify } from '../../hooks/useSpotify';

const LIMIT = 50;

export const Library = () => {
  const spotify = useSpotify();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page<SimplifiedPlaylist> | null>(null);
  const [items, setItems] = useState<Page<SimplifiedPlaylist>['items'] | null>(null);

  useEffect(() => {
    let isMounted = true;

    void (async () => {
      const [user, playlistPage] = await Promise.all([
        spotify.currentUser.profile(),
        spotify.currentUser.playlists.playlists(LIMIT),
      ]);

      if (!isMounted) {
        return;
      }

      setCurrentUser(user);
      setPage(playlistPage);
      setItems((prevState) => {
        if (prevState) {
          return [...prevState, ...playlistPage.items];
        } else {
          return [...playlistPage.items];
        }
      });
    })();

    return () => {
      isMounted = false;
    };
  }, [spotify.currentUser]);

  return (
    <>
      {currentUser && page ? (
        <>
          <RouteHeading title="Your Library" userProfilePictureUrl={currentUser.images[0].url} />

          <p className="text-subdued italic">Only your saved playlists are shown.</p>

          <hr className="text-green" />

          {items ? (
            items.map((item, i) => {
              if (i !== items.length - 1) {
                return (
                  <Link to={`/playlist/${item.id}`} key={item.id}>
                    <PlaylistItem title={item.name} owner={item.owner.display_name} coverUrl={item.images[0].url} />
                  </Link>
                );
              } else {
                return (
                  <React.Fragment key={crypto.randomUUID()}>
                    <Link to={`/playlist/${item.id}`} key={item.id}>
                      <PlaylistItem title={item.name} owner={item.owner.display_name} coverUrl={item.images[0].url} />
                    </Link>
                    {page.next && (
                      <PrimaryButton
                        key={crypto.randomUUID()}
                        content="Load more"
                        type="button"
                        onClick={() => {
                          void spotify.currentUser.playlists.playlists(LIMIT, page.limit + page.offset).then((res) => {
                            setPage(res);
                            setItems((prevState) => {
                              if (prevState) {
                                return [...prevState, ...res.items];
                              }
                              return [...res.items];
                            });
                          });
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              }
            })
          ) : (
            <EmptyState content="Your library seems to be empty." />
          )}
        </>
      ) : (
        <div className="fixed inset-0 flex justify-center items-center">
          <BasicSpinner />
        </div>
      )}

      <Navbar />
    </>
  );
};
