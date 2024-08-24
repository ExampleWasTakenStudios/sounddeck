import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/button/PrimaryButton';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <main className="px-4 py-10 bg-black text-white min-h-screen flex flex-col items-center gap-5">
      <h1 className="font-bold text-3xl text-center">Welcome to SoundDeck!</h1>

      <hr className="my-5 border-b border-dark-subdued w-full" />

      <div className="flex flex-col gap-2 text-subdued text-md">
        <p>To use SoundDeck you need a Spotify Account.</p>
        <p>We&apos;re asking for the following permissions to access your Spotify Account:</p>
        <ul className="flex flex-col gap-2 ml-3">
          <li className="before:content-[''] before:bg-subdued before:mr-2 before:inline-block before:w-2 before:h-2 before:align-middle before:rounded-full">
            Read access to your basic Spotify details such as your profile picture, username, and followers.
          </li>
          <li className="before:content-[''] before:bg-subdued before:mr-2 before:inline-block before:w-2 before:h-2 before:align-middle before:rounded-full">
            Write access to your Spotify Library to create playlists for the songs from your mixes.
          </li>
          <li className="before:content-[''] before:bg-subdued before:mr-2 before:inline-block before:w-2 before:h-2 before:align-middle before:rounded-full">
            Write access to your Spotify Playlists to fill playlists with the songs from your mixes.
          </li>
        </ul>
        <p>
          These permissions are required for SoundDeck to work. You can revoke SoundDeck&apos;s access to your account
          at any time in your{' '}
          <a
            className="text-green underline underline-offset-1"
            href="https://www.spotify.com/account/apps/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Spotify&nbsp;Account
          </a>
          .
        </p>
        <p>
          All information is stored exclusively on this device. We never share your data with anyone except Spotify for
          the above mentioned functionality.
        </p>
      </div>

      <hr className="my-5 border-b border-dark-subdued w-full" />

      <div className="w-full flex flex-col gap-5">
        <h2 className="text-2xl font-medium text-center">Log in to Spotify</h2>
        <PrimaryButton
          content="Log In with Spotify"
          onClick={() => navigate('/oauth2/authorize')}
          icon={<img src="/img/spotify/icons/Spotify_Icon_White.png" alt="Spotify Icon" width={20} height={20} />}
        />
        <p className="text-subdued text-center text-sm font-thin">
          SoundDeck is neither endorsed nor associated by or with Spotify AB.
        </p>
      </div>

      <hr className="my-5 border-b border-dark-subdued w-full" />

      <div className="w-full flex flex-col justify-center items-center gap-2 text-subdued">
        <p>SoundDeck is 100% open source!</p>
        <a
          className="text-green underline underline-offset-1"
          href="https://github.com/ExampleWasTakenStudios/sounddeck"
        >
          Visit us on GitHub.
        </a>
      </div>
    </main>
  );
};
