import { SpotifyRequest } from '../../requests/SpotifyRequest';

export interface AddItemsToPlaylistOption {
  playlistId: string;
  uris: string[];
  position?: number;
}

const ENDPOINT = '/playlists';

export const addItemsToPlaylist = async ({ playlistId, uris, position }: AddItemsToPlaylistOption) => {
  const endpoint = `${ENDPOINT}/${playlistId}/tracks`;

  const body = JSON.stringify({ uris, position });

  return new SpotifyRequest().post(endpoint, body);
};
