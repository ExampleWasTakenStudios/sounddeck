import { Page, SimplifiedPlaylist, User } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

          <p className="text-subdued italic">Only your saved playlists are shown.</p>

          <hr className="text-green" />

          {playlists.items.map((playlist) => {
            return (
              <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                <PlaylistItem
                  title={playlist.name}
                  owner={playlist.owner.display_name}
                  coverUrl={playlist.images[0].url}
                />
              </Link>
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
