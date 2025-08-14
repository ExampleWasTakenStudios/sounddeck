import { Playlist, SimplifiedPlaylist, UserProfile } from '@spotify/web-api-ts-sdk';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/navbar/Navbar';
import { RouteHeading } from '../../components/route-heading/RouteHeading';
import { MainSearchBar } from '../../components/searchbars/mainSearchBar/MainSearchBar';
import { MainSearchSuggestions } from '../../components/searchbars/mainSearchBar/MainSearchSuggestions';
import { BasicSpinner } from '../../components/spinners/BasicSpinner';
import { useSpotify } from '../../hooks/useSpotify';

export const Search = () => {
  const spotify = useSpotify();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [searchResult, setSearchResult] = useState<SimplifiedPlaylist[]>();
  const [featuredItem, setFeaturedItem] = useState<Playlist>();

  useEffect(() => {
    void (async () => {
      setFeaturedItem(await spotify.playlists.getPlaylist('65uAjFTt4N8sEJeonhNOBL', undefined));
    })();
  }, [spotify]);

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
                        <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                          <MainSearchSuggestions
                            artists={playlist.owner.display_name}
                            covers={playlist.images}
                            title={playlist.name}
                          />
                        </Link>
                      );
                    })
                  : null
              }
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-thin my-2">Featured</h2>

            {featuredItem ? (
              <Link
                to={featuredItem.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <img
                  className="my-2 rounded-md aspect-square"
                  src={
                    'https://upload.wikimedia.org/wikipedia/en/a/a4/The_Life_of_a_Showgirl_-_Taylor_Swift_album_artwork.png'
                  }
                  height={250}
                  width={250}
                />
                <h1 className="text-center w-1/2">{featuredItem.name}</h1>
              </Link>
            ) : (
              <BasicSpinner />
            )}
          </div>
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
