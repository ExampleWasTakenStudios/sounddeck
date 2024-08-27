import { Page, SimplifiedPlaylist, User } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import { PlaylistItem } from '../../components/list-items/PlaylistItem';
import { Navbar } from '../../components/navbar/Navbar';
import { RouteHeading } from '../../components/route-heading/RouteHeading';
import { BasicSpinner } from '../../components/spinners/BasicSpinner';
import { useSpotify } from '../../hooks/useSpotify';

export const Library = () => {
  const spotify = useSpotify();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [playlists, setPlaylists] = useState<Page<SimplifiedPlaylist> | null>(null);

  useEffect(() => {
    void (async () => {
      const [user, p] = await Promise.all([spotify.currentUser.profile(), spotify.currentUser.playlists.playlists()]);

      setCurrentUser(user);
      setPlaylists(p);
    })();
  }, [spotify]);

  return (
    <>
      {currentUser && playlists ? (
        <>
          <RouteHeading title="Your Library" userProfilePictureUrl={currentUser.images[0].url} />

          {playlists.items.map((item) => {
            return (
              <PlaylistItem
                title={item.name}
                owner={item.owner.display_name}
                coverUrl={item.images[0].url}
                key={item.id}
              />
            );
          })}
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
