import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SessionStorage } from 'storage-manager-js';
import { SESSION_STORAGE_KEYS } from '../../hooks/oauth2/utils';

export const OAuth2Fail = () => {
  const [params] = useSearchParams();

  const error = params.get('error');

  useEffect(() => {
    // clear all oauth2 related session stored keys
    SessionStorage.delete(SESSION_STORAGE_KEYS.codeChallenge);
    SessionStorage.delete(SESSION_STORAGE_KEYS.codeVerifier);
    SessionStorage.delete(SESSION_STORAGE_KEYS.state);
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center gap-5 text-center">
      <h1 className="text-3xl font-semibold">Oops 🥴</h1>
      <h2 className="">Something went wrong while trying to authenticate you.</h2>
      <Link className="text-green underline underline-offset-2" to="/">
        Return Home
      </Link>
      {error && <p className="text-subdued italic mt-10">{error}</p>}
    </div>
  );
};
