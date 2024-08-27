import { Playlist as SpotifyPlaylist, Track, User } from '@spotify/web-api-ts-sdk';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../../components/back-button/BackButton';
import { Fab } from '../../components/fab/Fab';
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

  useEffect(() => {
    if (!playlistId) {
      return;
    }

    void (async () => {
      try {
        const currentUser = await spotify.currentUser.profile();
        const playlist = await spotify.playlists.getPlaylist(playlistId);
        const playlistOwner = await spotify.users.profile(playlist.owner.id);

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
        <Fab onClick={() => navigate('save')}>
          <Save />
        </Fab>
      )}

      <Navbar />
    </>
  );
};
