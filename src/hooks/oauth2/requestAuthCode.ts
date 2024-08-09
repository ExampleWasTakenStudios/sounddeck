import { sha256 as hash256 } from 'crypto-hash';
import { SessionStorage } from 'storage-manager-js';
import { AUTHORIZATION_ENDPOINT, CLIENT_ID, REDIRECT_URI, SCOPES } from './constants';
import { base64UrlEncode, generateRandomString, SESSION_STORAGE_KEYS, sha256 } from './utils';

export const requestAuthCode = async () => {
  const url = new URL(AUTHORIZATION_ENDPOINT);

  const codeVerifier = generateRandomString(128);
  SessionStorage.set(SESSION_STORAGE_KEYS.codeVerifier, codeVerifier);

  const hash = await sha256(codeVerifier);
  const codeChallenge = base64UrlEncode(hash);
  SessionStorage.set(SESSION_STORAGE_KEYS.codeChallenge, codeChallenge);

  const state = await hash256(codeVerifier + codeChallenge);
  SessionStorage.set(SESSION_STORAGE_KEYS.state, state);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    state,
    scope: SCOPES.join(' '),
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: REDIRECT_URI,
    show_dialog: 'false',
  });

  url.search = params.toString();
  window.location.href = url.toString();
};
