import { Playlist as SpotifyPlaylist, Track, UserProfile } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylist } from '../../../api/endpoints/playlists/getPlaylist';
import { getMe } from '../../../api/endpoints/users/getMe';
import { getUser } from '../../../api/endpoints/users/getUser';
import { BackButton } from '../../../components/back-button/BackButton';
import { TrackListItem } from '../../../components/list-items/TrackListItem';
import { Navbar } from '../../../components/navbar/Navbar';
import { PlaylistHeader } from '../../../components/playlist/PlaylistHeader';
import { BasicSpinner } from '../../../components/spinners/BasicSpinner';

export const Playlist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [playlistOwner, setPlaylistOwner] = useState<UserProfile | null>(null);

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

      <Navbar />
    </>
  );
};
