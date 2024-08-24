import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { createContext } from 'react';

export const SpotifyContext = createContext<SpotifyApi | null>(null);
