import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SessionStorage } from 'storage-manager-js';
import { BasicSpinner } from '../../components/spinners/BasicSpinner';
import { useOAuth2PKCE } from '../../hooks/oauth2/useOAuth2PKCE';
import { SESSION_STORAGE_KEYS } from '../../hooks/oauth2/utils';

export const OAuth2Authentication = () => {
  const { requestAccessToken } = useOAuth2PKCE();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const requestedAccessToken = useRef(false);

  useEffect(() => {
    const f = async () => {
      if (!requestedAccessToken.current) {
        requestedAccessToken.current = true;

        const state = params.get('state');
        const code = params.get('code');
        const error = params.get('error');

        // if there is no state param or if it doesn't match the generated state value we abort for security reasons.
        if (state !== SessionStorage.get(SESSION_STORAGE_KEYS.state)) {
          navigate({
            pathname: '/oauth2/fail',
            search: 'error=Received an invalid state value.',
          });
          return;
        }

        // if there is no code parameter we can't authenticate and fail the flow.
        if (!code) {
          navigate({
            pathname: '/oauth2/fail',
            search: `error=${error}` ?? '',
          });
          return;
        }

        await requestAccessToken(code);

        navigate('/oauth2/success');
      }
    };

    void f();
  }, [navigate, params, requestAccessToken]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <BasicSpinner />
      <p>Authenticating</p>
    </div>
  );
};
