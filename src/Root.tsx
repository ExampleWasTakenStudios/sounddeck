import { PrimaryButton } from './components/button/PrimaryButton';
import { Header } from './components/header/Header';

export const Root = () => {
  return (
    <div className="bg-black text-white font-sans-serif h-screen w-screen flex flex-col">
      <Header />
      <main className="m-4 flex justify-center">
        <PrimaryButton
          content="Login with Spotify"
          icon={<img className="w-4 aspect-square" src="/img/spotify/icons/Spotify_Icon_Black.png"></img>}
          onClick={() => console.log('login button clicked')}
        />
      </main>
    </div>
  );
};
