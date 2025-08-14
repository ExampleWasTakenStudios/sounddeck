import { SimplifiedPlaylist, UserProfile } from '@spotify/web-api-ts-sdk';
import { ChangeEvent, useEffect, useState } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import { RouteHeading } from '../../components/route-heading/RouteHeading';
import { MainSearchBar } from '../../components/searchbars/mainSearchBar/MainSearchBar';
import { MainSearchSuggestions } from '../../components/searchbars/mainSearchBar/MainSearchSuggestions';
import { BasicSpinner } from '../../components/spinners/BasicSpinner';
import { EmptyState } from '../../EmptyState';
import { useSpotify } from '../../hooks/useSpotify';

export const Search = () => {
  const spotify = useSpotify();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [searchResult, setSearchResult] = useState<SimplifiedPlaylist[]>();

  useEffect(() => {
    void (async () => {
      setCurrentUser(await spotify.currentUser.profile());
    })();
  }, [spotify]);

  const onSearchBarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    if (query.length < 1) return;

    const result = await spotify.search(query, ['playlist'], undefined, 8);

    const items = result.playlists.items.filter((item) => {
      if (item) {
        return true;
      }
      return false;
    }) as unknown as SimplifiedPlaylist[];

    setSearchResult(items);
  };

  return (
    <>
      {currentUser ? (
        <>
          <RouteHeading title="Search" userProfilePictures={currentUser.images} />

          <div className="sm:flex sm:justify-center">
            <MainSearchBar
              onChange={(event) => void onSearchBarChange(event)}
              suggestions={
                searchResult
                  ? searchResult.map((playlist) => {
                      return (
                        <MainSearchSuggestions
                          artists={playlist.owner.display_name}
                          covers={playlist.images}
                          title={playlist.name}
                          key={playlist.id}
                        />
                      );
                    })
                  : null
              }
            />
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
