import { FeaturedPlaylists, PartialSearchResult, UserProfile } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/navbar/Navbar';
import { PlaylistCard } from '../../components/playlist-card/PlaylistCard';
import { RouteHeading } from '../../components/route-heading/RouteHeading';
import { MainSearchBar } from '../../components/searchbars/mainSearchBar/MainSearchBar';
import { MainSearchSuggestions } from '../../components/searchbars/mainSearchBar/MainSearchSuggestions';
import { BasicSpinner } from '../../components/spinners/BasicSpinner';
import { EmptyState } from '../../EmptyState';
import { useSpotify } from '../../hooks/useSpotify';

export const Search = () => {
  const spotify = useSpotify();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [searchResults, setSearchResults] = useState<Required<Pick<PartialSearchResult, 'playlists'>> | null>(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<FeaturedPlaylists | null>(null);

  const onSearchBarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    if (query.length < 1) {
      setSearchResults(null);
      return;
    }

    setSearchResults(await spotify.search(query, ['playlist'], undefined, 8));
  };

  useEffect(() => {
    void (async () => {
      setFeaturedPlaylists(await spotify.browse.getFeaturedPlaylists());
    })();

    void (async () => {
      setCurrentUser(await spotify.currentUser.profile());
    })();
  }, [spotify]);

  return (
    <>
      {currentUser && featuredPlaylists ? (
        <>
          <RouteHeading title="Search" userProfilePictureUrl={currentUser?.images[0].url} />

          <MainSearchBar
            onChange={(event) => void onSearchBarChange(event)}
            suggestions={searchResults?.playlists?.items.map((playlist) => {
              return (
                <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                  <MainSearchSuggestions
                    title={playlist.name}
                    artists={playlist.owner.display_name}
                    coverUrl={playlist.images[0].url}
                  />
                </Link>
              );
            })}
          />

          <h2 className="text-xl font-thin my-2">Featured Playlists</h2>

          {featuredPlaylists ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {featuredPlaylists.playlists.items.map((playlist) => {
                return (
                  <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                    <PlaylistCard
                      title={playlist.name}
                      width={playlist.images[0].width}
                      coverUrl={playlist.images[0].url}
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <EmptyState content="We'd love to recommend you something good but we're just as clueless as you." />
          )}
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
