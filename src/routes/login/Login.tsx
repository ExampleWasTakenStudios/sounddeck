import { PrimaryButton } from '../../components/button/PrimaryButton';

export const Login = () => {
  return (
    <section className="h-full flex flex-col justify-around text-center">
      <p className="text-3xl font-thin">Welcome to SoundDeck!</p>

      <div className="flex flex-col">
        <p className="text-lg font-thin -mb-5">powered by</p>
        <img src="/img/spotify/logos/Spotify_Logo_Green.png" alt="Spotify logo" />
      </div>

      <div className="flex flex-col justify-between items-center">
        <PrimaryButton
          content="Login with Spotify"
          icon={<img className="w-4" src="/img/spotify/icons/Spotify_Icon_White.png" alt="Spotify Icon" />}
          onClick={() => {}}
        />
      </div>

      <div className="flex flex-col gap-2 self-center absolute bottom-4">
        <p className="text-subdued font-thin text-sm">SoundDeck is not associated with Spotify AB.</p>
        <p className="text-subdued font-thin text-xs">
          By using SoundDeck you agree to the{' '}
          <a
            className="text-green underline underline-offset-2"
            href="https://www.spotify.com/us/legal/end-user-agreement/"
          >
            Terms of Service
          </a>
          .
        </p>
      </div>
    </section>
  );
};
