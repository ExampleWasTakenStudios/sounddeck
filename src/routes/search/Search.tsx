import { UserProfile } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import { RouteHeading } from '../../components/route-heading/RouteHeading';
import { BasicSpinner } from '../../components/spinners/BasicSpinner';
import { EmptyState } from '../../EmptyState';
import { useSpotify } from '../../hooks/useSpotify';

export const Search = () => {
  const spotify = useSpotify();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    void (async () => {
      setCurrentUser(await spotify.currentUser.profile());
    })();
  }, [spotify]);

  return (
    <>
      {currentUser ? (
        <>
          <RouteHeading title="Search" userProfilePictures={currentUser.images} />

          <div className="sm:flex sm:justify-center">
            <p>Some day a search bar may replace me</p>
          </div>

          <h2 className="text-xl font-thin my-2">Featured Playlists</h2>

          <EmptyState content="We'd love to recommend you something good but we're just as clueless as you." />
        </>
      ) : (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
          <BasicSpinner />
        </div>
      )}

      <Navbar />
    </>
  );
};
