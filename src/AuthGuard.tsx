import { AuthorizationCodeWithPKCEStrategy, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BasicSpinner } from './components/spinners/BasicSpinner';
import { SpotifyContext } from './contexts/spotifyContext/SpotifyContex';
import { CLIENT_ID, REDIRECT_URI, SCOPES } from './routes/oauth2/constants';

export const AuthGuard = () => {
  const [sdk, setSdk] = useState<SpotifyApi | null>(null);

  useEffect(() => {
    void (async () => {
      // If the SDK is already defined and authenticated we can return as we don't need to authenticate again.
      if (sdk && (await sdk.getAccessToken())) {
        return;
      }

      const auth = new AuthorizationCodeWithPKCEStrategy(CLIENT_ID, REDIRECT_URI, SCOPES);
      const internalSdk = new SpotifyApi(auth);

      try {
        const { authenticated } = await internalSdk.authenticate();

        if (authenticated) {
          setSdk(internalSdk);
        }
      } catch (e) {
        if (e && e instanceof Error) {
          if (e.message && e.message.includes('No verifier found in cache')) {
            console.info('Strict mode tried to authenticate twice.');
          } else {
            console.error(e);
          }
        }
      }
    })();
  }, [sdk]);

  return (
    <>
      {sdk ? (
        <SpotifyContext.Provider value={sdk}>
          <Outlet />
        </SpotifyContext.Provider>
      ) : (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
          <BasicSpinner />
        </div>
      )}
    </>
  );
};
