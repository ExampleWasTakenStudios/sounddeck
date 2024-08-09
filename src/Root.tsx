import { PrimaryButton } from './components/button/PrimaryButton';
import { SecondaryButton } from './components/button/SecondaryButton';
import { Header } from './components/header/Header';
import { TextInput } from './components/inputs/TextInput';
import { PlaylistItem } from './components/list-items/PlaylistItem';
import { Navbar } from './components/navbar/Navbar';
import { PlaylistCard } from './components/playlist-card/PlaylistCard';
import { MainSearchBar } from './components/searchbar/MainSearchBar';

export const Root = () => {
  return (
    <div
      className="bg-black text-white font-sans-serif min-h-screen min-w-screen flex flex-col"
    >
      <Header />

      <main className="m-4 flex flex-col gap-3 mb-14">
        <div>
          <PrimaryButton
            content="Login with Spotify"
            icon={<img className="w-4 aspect-square" src="/img/spotify/icons/Spotify_Icon_Black.png"></img>}
            onClick={() => console.log('login button clicked')}
          />
        </div>
        <div>
          <SecondaryButton
            content="Login with Spotify"
            icon={<img className="w-4 aspect-square" src="/img/spotify/icons/Spotify_Icon_White.png"></img>}
            onClick={() => console.log('login button clicked')}
          />
        </div>

        <div>
          <MainSearchBar onChange={(event) => console.log('MainSearchBar:', event.target.value)} />
        </div>

        <div className="flex flex-row gap-5">
          <PlaylistCard title="Taylor Swift | The Eras Tour Official Setlist" coverUrl="/img/mock/playlist_cover.jpg" />
          <PlaylistCard title="Taylor Swift | The Eras Tour Official Setlist" coverUrl="/img/mock/playlist_cover.jpg" />
        </div>

        <div>
          <TextInput
            placeholder="Name your playlist"
            onChange={(event) => console.log('TextInput:', event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
          <PlaylistItem
            title="Taylor Swift | The Eras Tour Official Setlist"
            owner="Spotify"
            coverUrl="/img/mock/playlist_cover.jpg"
          />
        </div>
      </main>

      <Navbar currentItem="search" />
    </div>
  );
};
