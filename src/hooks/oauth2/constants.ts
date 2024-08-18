export const CLIENT_ID = 'bbde7600901b438493b4a18a12796262';

export const REDIRECT_URI =
  import.meta.env.MODE === 'production'
    ? 'https://sounddeck.examplewastaken.com/oauth2/'
    : 'http://localhost:5173/oauth2/';

export const AUTHORIZATION_ENDPOINT = 'https://accounts.spotify.com/authorize';
export const AUTHENTICATION_ENDPOINT = 'https://accounts.spotify.com/api/token';
export const SCOPES = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-library-modify',
  'user-library-read',
  'user-read-private',
  'user-read-email',
];
