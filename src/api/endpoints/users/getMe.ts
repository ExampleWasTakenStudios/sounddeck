import { UserProfile } from '@spotify/web-api-ts-sdk';
import { SpotifyRequest } from '../../requests/SpotifyRequest';

const ENDPOINT = '/me';

export const getMe = () => {
  return new SpotifyRequest().get<UserProfile>(ENDPOINT);
};
