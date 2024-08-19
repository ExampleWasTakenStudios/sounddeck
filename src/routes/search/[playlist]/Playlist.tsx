import { Playlist as SpotifyPlaylist, Track, User, UserProfile } from '@spotify/web-api-ts-sdk';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addItemsToPlaylist } from '../../../api/endpoints/playlists/addItemsToPlaylist';
import { createPlaylist } from '../../../api/endpoints/playlists/createPlaylist';
import { getPlaylist } from '../../../api/endpoints/playlists/getPlaylist';
import { getMe } from '../../../api/endpoints/users/getMe';
import { getUser } from '../../../api/endpoints/users/getUser';
import { BackButton } from '../../../components/back-button/BackButton';
import { PrimaryButton } from '../../../components/button/PrimaryButton';
import { SecondaryButton } from '../../../components/button/SecondaryButton';
import { Fab } from '../../../components/fab/Fab';
import { TextInput } from '../../../components/inputs/TextInput';
import { TrackListItem } from '../../../components/list-items/TrackListItem';
import { Navbar } from '../../../components/navbar/Navbar';
import { PlaylistHeader } from '../../../components/playlist/PlaylistHeader';
import { BasicSpinner } from '../../../components/spinners/BasicSpinner';

export const Playlist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [playlistOwner, setPlaylistOwner] = useState<UserProfile | null>(null);

  // Save Playlist logic
  const [saveActive, setSaveActive] = useState(false);
  const [newPlaylistName, setPlaylistName] = useState('');

  const onPlaylistSave = async () => {
    if (!newPlaylistName || !playlist) {
      return;
    }

    const createdPlaylist = await createPlaylist({ name: newPlaylistName, public: false, collaborative: false });

    const uris: string[] = [];
    for (const track of playlist.tracks.items) {
      uris.push(track.track.uri);
    }

    await addItemsToPlaylist({ playlistId: createdPlaylist.id, uris });

    navigate(`/playlist/${createdPlaylist.id}`);
    setSaveActive(false);
  };

  useEffect(() => {
    const asyncWrapper = async () => {
      setCurrentUser(await getMe());
    };

    void asyncWrapper();
  }, []);

  useEffect(() => {
    if (!playlistId) {
      return;
    }

    const asyncWrapper = async () => {
      try {
        const currentUser = await getMe();
        const playlist = await getPlaylist({ playlistId, market: currentUser.country });
        const playlistOwner = await getUser({ userId: playlist.owner.id });

        setPlaylist(playlist);
        setPlaylistOwner(playlistOwner);
      } catch (e) {
        console.error(e);
      }
    };

    void asyncWrapper();
  }, [playlistId]);

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
          {playlist.tracks.items.map((track) => {
            if (track.track.type !== 'track') {
              return null;
            }

            const castedTrack = track.track as Track;
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
              onClick={() => void onPlaylistSave()}
              disabled={!newPlaylistName}
              width={80}
            />
          </div>
        </div>
      )}
    </>
  );
};
