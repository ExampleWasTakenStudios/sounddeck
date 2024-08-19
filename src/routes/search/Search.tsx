import { FeaturedPlaylists, ItemTypes, SearchResults } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getFeaturedPlaylists } from '../../api/endpoints/browse/featuredPlaylists';
import { search } from '../../api/endpoints/search/search';
import { Navbar } from '../../components/navbar/Navbar';
import { PlaylistCard } from '../../components/playlist-card/PlaylistCard';
import { RouteHeading } from '../../components/route-heading/RouteHeading';
import { MainSearchBar } from '../../components/searchbars/MainSearchBar';
import { EmptyState } from '../../EmptyState';

const ENABLE_SEARCH = false;

export const Search = () => {
  const location = useLocation();
  const [_searchResults, setSearchResults] = useState<SearchResults<ItemTypes[]>>();

  const [featuredPlaylists, setFeaturedPlaylists] = useState<FeaturedPlaylists | null>(null);

  const onSearchBarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!ENABLE_SEARCH) return;

    const query = event.target.value;

    const results = await search({ query, type: ['track'] });
    setSearchResults(results);
    console.log(results.tracks!.items[0].name, 'by', results.tracks!.items[0].artists[0].name);
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

      <MainSearchBar onChange={(event) => void onSearchBarChange(event)} />

      <h2 className="text-xl font-thin my-2">Featured Playlists</h2>

      {featuredPlaylists ? (
        <div className="grid grid-cols-2 gap-5">
          {featuredPlaylists.playlists.items.map((playlist) => {
            return (
              <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                <PlaylistCard title={playlist.name} coverUrl={playlist.images[0].url} />
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState content="We'd love to recommend you something good but we're just as clueless as you." />
      )}

      <Navbar currentItem={location.pathname.startsWith('/search') ? 'search' : 'library'} />
    </>
  );
};
