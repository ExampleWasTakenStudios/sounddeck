import { Playlist } from '@spotify/web-api-ts-sdk';
import { SpotifyRequest } from '../../requests/SpotifyRequest';
import { getMe } from '../users/getMe';

export interface CreatePlaylistOptions {
  name: string;
  public?: boolean;
  collaborative?: boolean;
  description?: string;
}

const ENDPOINT = '/users';

export const createPlaylist = async (options: CreatePlaylistOptions) => {
  const userId = (await getMe()).id;

  const endpoint = `${ENDPOINT}/${userId}/playlists`;

  return new SpotifyRequest().post<Playlist>(endpoint, JSON.stringify(options));
};
