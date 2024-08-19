import { ItemTypes, MaxInt, SearchResults } from '@spotify/web-api-ts-sdk';
import { SpotifyRequest } from '../../requests/SpotifyRequest';
export type SearchType = 'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook';

export interface SearchOptions {
  query: string;
  type: ItemTypes[];
  limit?: MaxInt<50>;
  offset?: number;
}

const ENDPOINT = '/search?';

export const search = ({ query, type, limit = 20, offset = 0 }: SearchOptions) => {
  const params = new URLSearchParams({
    q: query,
    type: type.join(','),
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const endpoint = `${ENDPOINT}?${params.toString()}`;

  return new SpotifyRequest().get<SearchResults<ItemTypes[]>>(endpoint);
};
