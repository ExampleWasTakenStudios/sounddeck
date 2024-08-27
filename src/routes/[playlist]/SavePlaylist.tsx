import { PlaylistedTrack, SpotifyApi, Track } from '@spotify/web-api-ts-sdk';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PrimaryButton } from '../../components/button/PrimaryButton';
import { SecondaryButton } from '../../components/button/SecondaryButton';
import { TextInput } from '../../components/inputs/TextInput';
import { BasicSpinner } from '../../components/spinners/BasicSpinner';
import { useSpotify } from '../../hooks/useSpotify';

const recursivelyGetPlaylistItems = async (spotify: SpotifyApi, playlistId: string, offset = 0) => {
  let items: PlaylistedTrack<Track>[] = [];

  const playlistItems = await spotify.playlists.getPlaylistItems(playlistId, undefined, undefined, 50, offset);

  items = items.concat(playlistItems.items);

  if (playlistItems.next) {
    offset += playlistItems.limit;
    items = items.concat(await recursivelyGetPlaylistItems(spotify, playlistId, offset));
  }

  return items;
};

export const SavePlaylist = () => {
  const navigate = useNavigate();
  const spotify = useSpotify();

  const { playlistId } = useParams();

  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);

  const onSubmit = async () => {
    if (!newPlaylistName || !playlistId) {
      return;
    }

    setCreatingPlaylist(true);

    const allSourcePlaylistItems = await recursivelyGetPlaylistItems(spotify, playlistId);
    if (allSourcePlaylistItems.length < 1) {
      console.log('No source playlist items received. Returning.');
      return;
    }

    const itemUris = allSourcePlaylistItems
      .filter((item) => item.track) // for some unknown reason the api sometimes returns items with their track set to null.
      .map((item) => {
        return item.track.uri;
      });

    const today = new Date();
    const newPlaylist = await spotify.playlists.createPlaylist((await spotify.currentUser.profile()).id, {
      name: newPlaylistName,
      public: false,
      collaborative: false,
      description: `Created by SoundDeck at ${today.getUTCDate().toString()}/${(today.getUTCMonth() + 1).toString()}/${today.getUTCFullYear().toString()}.`,
    });

    try {
      await spotify.playlists.addItemsToPlaylist(newPlaylist.id, itemUris);
    } catch (e) {
      console.log(
        "Error occurred while trying to add items to new playlist. Removing playlist from the user's library.",
      );
      console.error(e);

      try {
        await spotify.currentUser.playlists.unfollow(newPlaylist.id);
      } catch (e) {
        console.error('Failed to unfollow playlist (after unsuccessful creation).', e);
      }
    }

    navigate(`/playlist/${newPlaylist.id}`, { replace: true });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-transparent bg-gradient-to-b from-purple/50 to-green/50 flex flex-col justify-center items-center gap-5">
      {!creatingPlaylist ? (
        <>
          <TextInput
            placeholder="Give your playlist a name."
            onChange={(event) => setNewPlaylistName(event.target.value)}
          />
          <div className="flex flex-row justify-around gap-3">
            <SecondaryButton content="Cancel" type="button" onClick={() => navigate(-1)} width={80} />
            <PrimaryButton content="Save" type="submit" onClick={() => void onSubmit()} disabled={false} width={80} />
          </div>
        </>
      ) : (
        <BasicSpinner />
      )}
    </div>
  );
};
