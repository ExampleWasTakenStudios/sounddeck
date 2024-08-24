import { useContext } from 'react';
import { SpotifyContext } from '../contexts/spotifyContext/SpotifyContex';

export const useSpotify = () => {
  const spotify = useContext(SpotifyContext);

  if (!spotify) {
    throw new Error('Spotify SDK is null. Did you try to access it outside the context?');
  }

  return spotify;
};
