import { UserProfile } from '@spotify/web-api-ts-sdk';
import { SpotifyRequest } from '../../requests/SpotifyRequest';

export interface UserOptions {
  userId: string;
}

const ENDPOINT = '/users';

export const getUser = ({ userId }: UserOptions) => {
  const endpoint = `${ENDPOINT}/${userId}`;

  return new SpotifyRequest().get<UserProfile>(endpoint);
};
