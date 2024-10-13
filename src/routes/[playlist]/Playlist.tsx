import { Page, PlaylistedTrack, Playlist as SpotifyPlaylist, Track, TrackItem, User } from '@spotify/web-api-ts-sdk';
import { Save } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../../components/back-button/BackButton';
import { PrimaryButton } from '../../components/button/PrimaryButton';
import { Fab } from '../../components/fab/Fab';
import { TrackListItem } from '../../components/list-items/TrackListItem';
import { Navbar } from '../../components/navbar/Navbar';
import { PlaylistHeader } from '../../components/playlist/PlaylistHeader';
import { BasicSpinner } from '../../components/spinners/BasicSpinner';
import { EmptyState } from '../../EmptyState';
import { useSpotify } from '../../hooks/useSpotify';

const LIMIT = 50;

export const Playlist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const spotify = useSpotify();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);

  const [page, setPage] = useState<Page<PlaylistedTrack<Track | TrackItem>> | null>(null);
  const [items, setItems] = useState<PlaylistedTrack<Track>[] | null>(null);

  useEffect(() => {
    if (!playlistId) {
      return;
    }

    let isMounted = true;

    void (async () => {
      const playlist = await spotify.playlists.getPlaylist(playlistId);

      const [user, paginatedItems] = await Promise.all([
        spotify.currentUser.profile(),
        spotify.playlists.getPlaylistItems(playlistId, undefined, undefined, LIMIT, 0),
      ]);

      setPlaylist(playlist);
      setCurrentUser(user);

      if (!isMounted) {
        return;
      }
      setPage(paginatedItems);
      setItems((prevState) => {
        if (prevState) {
          return [...prevState, ...paginatedItems.items];
        } else {
          return [...paginatedItems.items];
        }
      });
    })();

    return () => {
      isMounted = false;
    };
  }, [playlistId, spotify.currentUser, spotify.playlists, spotify.users]);

  return (
    <>
      <BackButton content="Back" />
      {playlist ? (
        <section className="flex flex-col gap-4 sm:gap-0">
          <PlaylistHeader playlist={playlist} />
          {items ? (
            items.map((item, i) => {
              // for some reason the api sometimes returns invalid objects.
              if (item.track === null || item.track.type !== 'track') {
                return;
              }

              const castedTrack = item.track;
              const artistsString = castedTrack.artists.map((artist) => artist.name).join(', ');

              if (i !== items.length - 1) {
                return (
                  <TrackListItem
                    key={castedTrack.id}
                    title={castedTrack.name}
                    artist={artistsString}
                    coverUrl={castedTrack.album.images[0].url}
                    explicit={castedTrack.explicit}
                  />
                );
              }

              return (
                <React.Fragment key={crypto.randomUUID()}>
                  <TrackListItem
                    key={castedTrack.id}
                    title={castedTrack.name}
                    artist={artistsString}
                    coverUrl={castedTrack.album.images[0].url}
                    explicit={castedTrack.explicit}
                  />
                  {page && page.next && (
                    <PrimaryButton
                      key={crypto.randomUUID()}
                      content="Load more"
                      type="button"
                      onClick={() => {
                        void spotify.playlists
                          .getPlaylistItems(playlist.id, undefined, undefined, LIMIT, page.limit + page.offset)
                          .then((res) => {
                            setPage(res);
                            setItems((prevState) => {
                              if (prevState) {
                                return [...prevState, ...res.items];
                              } else {
                                return [...res.items];
                              }
                            });
                          });
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <EmptyState content="Your playlist seems to be empty." />
          )}
        </section>
      ) : (
        <section className="h-96 flex flex-col justify-center items-center">
          <BasicSpinner />
          <p className="font-thin">Fetching Playlist...</p>
        </section>
      )}

      {playlist && currentUser && playlist.owner.id !== currentUser.id && (
        <Fab onClick={() => navigate('save')}>
          <Save />
        </Fab>
      )}

      <Navbar />
    </>
  );
};
