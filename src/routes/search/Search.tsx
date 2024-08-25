import { FeaturedPlaylists, PartialSearchResult } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrackListItem } from '../../components/list-items/TrackListItem';
import { Navbar } from '../../components/navbar/Navbar';
import { PlaylistCard } from '../../components/playlist-card/PlaylistCard';
import { RouteHeading } from '../../components/route-heading/RouteHeading';
import { MainSearchBar } from '../../components/searchbars/MainSearchBar';
import { EmptyState } from '../../EmptyState';
import { useSpotify } from '../../hooks/useSpotify';

export const Search = () => {
  const [searchResults, setSearchResults] = useState<Required<Pick<PartialSearchResult, 'playlists'>> | null>(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<FeaturedPlaylists | null>(null);
  const spotify = useSpotify();

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
  }, [spotify]);

  return (
    <>
      <RouteHeading title="Search" />

      <MainSearchBar
        onChange={(event) => void onSearchBarChange(event)}
        suggestions={searchResults?.playlists?.items.map((playlist) => {
          return (
            <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
              <TrackListItem
                title={playlist.name}
                artist={playlist.owner.display_name}
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

      <Navbar />
    </>
  );
};
