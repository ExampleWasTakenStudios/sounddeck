import { PlaylistedTrack, Playlist as SpotifyPlaylist, Track, User } from '@spotify/web-api-ts-sdk';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../../components/back-button/BackButton';
import { PrimaryButton } from '../../components/button/PrimaryButton';
import { SecondaryButton } from '../../components/button/SecondaryButton';
import { Fab } from '../../components/fab/Fab';
import { TextInput } from '../../components/inputs/TextInput';
import { TrackListItem } from '../../components/list-items/TrackListItem';
import { Navbar } from '../../components/navbar/Navbar';
import { PlaylistHeader } from '../../components/playlist/PlaylistHeader';
import { BasicSpinner } from '../../components/spinners/BasicSpinner';
import { useSpotify } from '../../hooks/useSpotify';

export const Playlist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const spotify = useSpotify();

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [playlistOwner, setPlaylistOwner] = useState<User | null>(null);

  // Save Playlist logic
  const [saveActive, setSaveActive] = useState(false);
  const [newPlaylistName, setPlaylistName] = useState('');

  const recursivelyGetPlaylistItems = async (playlistId: string, offset = 0) => {
    let items: PlaylistedTrack<Track>[] = [];

    const playlistItems = await spotify.playlists.getPlaylistItems(playlistId, undefined, undefined, 50, offset);

    items = items.concat(playlistItems.items);

    if (playlistItems.next) {
      offset += playlistItems.limit;
      items = items.concat(await recursivelyGetPlaylistItems(playlistId, offset));
    }

    return items;
  };

  const playlistSaveHandler = async () => {
    if (!newPlaylistName || !playlist || !playlistId) {
      return;
    }

    setSaveActive(false);

    const playlistItems = await recursivelyGetPlaylistItems(playlistId);

    console.log('FINAL ITEMS:', playlistItems);

    if (playlistItems.length < 1) {
      console.error('No playlist items');
      return;
    }

    const createdPlaylist = await spotify.playlists.createPlaylist((await spotify.currentUser.profile()).id, {
      name: newPlaylistName,
      public: false,
      collaborative: false,
    });

    const uris: string[] = [];
    for (const item of playlistItems) {
      if (!item.track) {
        continue;
      }
      uris.push(item.track.uri);
    }

    console.log('URIs:', uris);

    try {
      await spotify.playlists.addItemsToPlaylist(createdPlaylist.id, uris);
    } catch (e) {
      console.error(e);
    }

    navigate(`/playlist/${createdPlaylist.id}`);
  };

  useEffect(() => {
    if (!playlistId) {
      return;
    }

    void (async () => {
      try {
        const currentUser = await spotify.currentUser.profile();
        const playlist = await spotify.playlists.getPlaylist(playlistId);
        const playlistOwner = await spotify.users.profile(playlist.owner.id);

        console.log('PLAYLIST:', playlist);

        setCurrentUser(currentUser);
        setPlaylist(playlist);
        setPlaylistOwner(playlistOwner);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [spotify, playlistId]);

  return (
    <>
      <BackButton content="Back" />
      {playlist ? (
        <section className="flex flex-col gap-4">
          <PlaylistHeader
            title={playlist.name}
            description={playlist.description}
            owner={playlist.owner.display_name}
            coverUrl={playlist.images[0].url}
            ownerProfilePictureUrl={playlistOwner ? playlistOwner.images[playlistOwner.images.length - 1].url : ''}
          />
          {playlist.tracks.items.map((item) => {
            // for some reason the api sometimes returns invalid objects.
            if (item.track === null || item.track.type !== 'track') {
              return;
            }

            const castedTrack = item.track as Track;
            const artistsString = castedTrack.artists.map((artist) => artist.name).join(', ');
            return (
              <TrackListItem
                key={castedTrack.id}
                title={castedTrack.name}
                artist={artistsString}
                coverUrl={castedTrack.album.images[0].url}
                explicit={castedTrack.explicit}
              />
            );
          })}
        </section>
      ) : (
        <section className="h-96 flex flex-col justify-center items-center">
          <BasicSpinner />
          <p className="font-thin">Fetching Playlist...</p>
        </section>
      )}

      {playlist && currentUser && playlist.owner.id !== currentUser.id && (
        <Fab onClick={() => setSaveActive(true)}>
          <Save />
        </Fab>
      )}

      <Navbar />

      {saveActive && (
        <div className="fixed inset-0 backdrop-blur-lg bg-transparent bg-gradient-to-b from-purple/50 to-green/50 flex flex-col justify-center items-center gap-5">
          <TextInput
            placeholder="Give your playlist a name."
            onChange={(event) => setPlaylistName(event.target.value)}
          />
          <div className="flex flex-row justify-around gap-3">
            <SecondaryButton content="Cancel" onClick={() => setSaveActive(false)} width={80} />
            <PrimaryButton
              content="Save"
              onClick={() => void playlistSaveHandler()}
              disabled={!newPlaylistName}
              width={80}
            />
          </div>
        </div>
      )}
    </>
  );
};
