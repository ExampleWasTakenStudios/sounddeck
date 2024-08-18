export const generateRandomString = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

export const base64UrlEncode = (buffer: ArrayBuffer): string => {
  return window
    .btoa(String.fromCharCode.apply(null, new Uint8Array(buffer) as unknown as number[]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
};

export const sha256 = async (string: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(string);
  return window.crypto.subtle.digest('SHA-256', data);
};

export const SESSION_STORAGE_KEYS = {
  codeVerifier: 'sounddeck:code_verifier',
  codeChallenge: 'sounddeck:code_challenge',
  state: 'sounddeck:state',
};

export const LOCAL_STORAGE_KEYS = {
  accessToken: 'sounddeck:access_token',
};

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}
