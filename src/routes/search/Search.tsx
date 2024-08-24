import { FeaturedPlaylists, ItemTypes, SearchResults } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedPlaylists } from '../../api/endpoints/browse/featuredPlaylists';
import { search } from '../../api/endpoints/search/search';
import { TrackListItem } from '../../components/list-items/TrackListItem';
import { Navbar } from '../../components/navbar/Navbar';
import { PlaylistCard } from '../../components/playlist-card/PlaylistCard';
import { RouteHeading } from '../../components/route-heading/RouteHeading';
import { MainSearchBar } from '../../components/searchbars/MainSearchBar';
import { EmptyState } from '../../EmptyState';

export const Search = () => {
  const [searchResults, setSearchResults] = useState<SearchResults<ItemTypes[]> | null>(null);

  const [featuredPlaylists, setFeaturedPlaylists] = useState<FeaturedPlaylists | null>(null);

  const onSearchBarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    if (query.length < 1) {
      setSearchResults(null);
      return;
    }

    const results = await search({ query, type: ['playlist'], limit: 8 });
    setSearchResults(results);
  };

  useEffect(() => {
    getFeaturedPlaylists({})
      .then((playlists) => setFeaturedPlaylists(playlists))
      .catch((e) => {
        console.error(e);
        setFeaturedPlaylists(null);
      });
  }, []);

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
