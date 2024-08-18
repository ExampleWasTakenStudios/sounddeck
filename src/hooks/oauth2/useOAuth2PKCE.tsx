import { CLIENT_ID, REDIRECT_URI, AUTHORIZATION_ENDPOINT, SCOPES } from './constants';
import { requestAccessToken } from './requestAccessToken';
import { requestAuthCode } from './requestAuthCode';

interface useOAuth2PKCEReturnObject {
  CLIENT_ID: string;
  REDIRECT_URI: string;
  AUTHORIZATION_ENDPOINT: string;
  SCOPES: string[];
  requestAuthCode: typeof requestAuthCode;
  requestAccessToken: typeof requestAccessToken;
}

export const useOAuth2PKCE = (): useOAuth2PKCEReturnObject => {
  return {
    CLIENT_ID,
    REDIRECT_URI,
    AUTHORIZATION_ENDPOINT,
    SCOPES,
    requestAuthCode,
    requestAccessToken,
  };
};
