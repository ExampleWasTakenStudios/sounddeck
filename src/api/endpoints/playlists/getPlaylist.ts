import { Playlist } from '@spotify/web-api-ts-sdk';
import { SpotifyRequest } from '../../requests/SpotifyRequest';

export interface PlaylistOptions {
  playlistId: string;
  market: string;
}

const ENDPOINT = '/playlists';

export const getPlaylist = ({ playlistId }: PlaylistOptions) => {
  const endpoint = `${ENDPOINT}/${playlistId}`;

  return new SpotifyRequest().get<Playlist>(endpoint);
};
