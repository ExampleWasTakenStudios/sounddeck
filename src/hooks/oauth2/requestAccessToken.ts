import { LocalStorage, SessionStorage } from 'storage-manager-js';
import { AccessTokenResponse, LOCAL_STORAGE_KEYS, SESSION_STORAGE_KEYS } from './utils';
import { AUTHENTICATION_ENDPOINT, CLIENT_ID, REDIRECT_URI } from './constants';

export const requestAccessToken = async (authCode: string) => {
  const codeVerifier = SessionStorage.get<string>(SESSION_STORAGE_KEYS.codeVerifier);

  if (!codeVerifier) {
    const errorParams = new URLSearchParams({
      error: 'No code verifier found in session storage',
    });

    const errorUrl = new URL('https://sounddeck.examplewastaken.com/oauth2/fail');
    errorUrl.search = errorParams.toString();

    window.location.href = errorUrl.toString();
    return;
  }

  const payload: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  };

  const body = await fetch(AUTHENTICATION_ENDPOINT, payload);
  const response = (await body.json()) as AccessTokenResponse;

  LocalStorage.set(LOCAL_STORAGE_KEYS.accessToken, response);
};
