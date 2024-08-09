import { Bookmark } from 'lucide-react';
import { BackButton } from '../components/back-button/BackButton';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { SecondaryButton } from '../components/button/SecondaryButton';
import { Fab } from '../components/fab/Fab';
import { TextInput } from '../components/inputs/TextInput';
import { PlaylistItem } from '../components/list-items/PlaylistItem';
import { TrackListItem } from '../components/list-items/TrackListItem';
import { PlaylistCard } from '../components/playlist-card/PlaylistCard';
import { PlaylistHeader } from '../components/playlist/PlaylistHeader';
import { MainSearchBar } from '../components/searchbars/MainSearchBar';
import { EmptyState } from '../EmptyState';
import { Navbar } from '../components/navbar/Navbar';

export const DesignSystem = () => {
  return (
    <>
      <div>
        <Fab onClick={() => console.log('FAB clicked')}>
          <Bookmark />
        </Fab>
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

      <EmptyState content="Save some mixes and watch them appear here.">
        <PrimaryButton content="Search Mixes" onClick={() => {}} />
      </EmptyState>

      <div>
        <BackButton content="Back" />
      </div>

      <div>
        <PlaylistHeader
          title="Taylor Swift | The Eras Tour Official Setlist"
          owner="Spotify"
          coverUrl="/img/mock/playlist_cover.jpg"
          ownerProfilePictureUrl="/img/spotify/icons/Spotify_Icon_Green.png"
          description="All the songs from the new setlist for Taylor Swift | The Eras Tour."
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
      </div>

      <div className="flex flex-col gap-2">
        <TrackListItem
          title="The Smallest Man Who Ever Lived"
          artist="Taylor Swift"
          coverUrl="/img/mock/album_cover.jpg"
        />
        <TrackListItem
          title="The Smallest Man Who Ever Lived"
          artist="Taylor Swift"
          coverUrl="/img/mock/album_cover.jpg"
        />
        <TrackListItem
          title="The Smallest Man Who Ever Lived"
          artist="Taylor Swift"
          coverUrl="/img/mock/album_cover.jpg"
        />
        <TrackListItem
          title="The Smallest Man Who Ever Lived"
          artist="Taylor Swift"
          coverUrl="/img/mock/album_cover.jpg"
        />
        <TrackListItem
          title="The Smallest Man Who Ever Lived"
          artist="Taylor Swift"
          coverUrl="/img/mock/album_cover.jpg"
        />
        <TrackListItem
          title="The Smallest Man Who Ever Lived"
          artist="Taylor Swift"
          coverUrl="/img/mock/album_cover.jpg"
        />
        <TrackListItem
          title="The Smallest Man Who Ever Lived"
          artist="Taylor Swift"
          coverUrl="/img/mock/album_cover.jpg"
        />
        <TrackListItem
          title="The Smallest Man Who Ever Lived"
          artist="Taylor Swift"
          coverUrl="/img/mock/album_cover.jpg"
        />
        <TrackListItem
          title="The Smallest Man Who Ever Lived"
          artist="Taylor Swift"
          coverUrl="/img/mock/album_cover.jpg"
        />
        <TrackListItem
          title="The Smallest Man Who Ever Lived"
          artist="Taylor Swift"
          coverUrl="/img/mock/album_cover.jpg"
        />
      </div>
      
      <Navbar currentItem="search" />
    </>
  );
};
