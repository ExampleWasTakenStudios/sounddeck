import { FeaturedPlaylists, MaxInt } from '@spotify/web-api-ts-sdk';
import { SpotifyRequest } from '../../requests/SpotifyRequest';

export interface FeaturedPlaylistOptions {
  locale?: string;
  limit?: MaxInt<50>;
  offset?: number;
}

const ENDPOINT = '/browse/featured-playlists';

export const getFeaturedPlaylists = ({ locale = 'en_US', limit = 20, offset = 0 }: FeaturedPlaylistOptions) => {
  const params = new URLSearchParams({
    locale: locale,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const endpoint = `${ENDPOINT}?${params.toString()}`;

  return new SpotifyRequest().get<FeaturedPlaylists>(endpoint);
};
