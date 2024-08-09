import { useEffect, useRef } from 'react';
import { BasicSpinner } from '../../components/spinners/BasicSpinner';
import { useOAuth2PKCE } from '../../hooks/oauth2/useOAuth2PKCE';

export const OAuth2Authorization = () => {
  const { requestAuthCode } = useOAuth2PKCE();

  const requestedAuthCode = useRef(false);

  useEffect(() => {
    if (!requestedAuthCode.current) {
      void requestAuthCode();
    }
  }, [requestAuthCode]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <BasicSpinner />
      <p>Requesting Authorization Code</p>
    </div>
  );
};
