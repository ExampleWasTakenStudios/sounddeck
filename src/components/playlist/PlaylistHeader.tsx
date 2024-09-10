import { Playlist, User } from '@spotify/web-api-ts-sdk';
import DOMPurify from 'dompurify';
import { decode } from 'html-entities';
import { useEffect, useState } from 'react';
import { useSpotify } from '../../hooks/useSpotify';

interface PlaylistHeaderProps {
  playlist: Playlist;
}

export const PlaylistHeader = ({ playlist }: PlaylistHeaderProps) => {
  const spotify = useSpotify();

  const [owner, setOwner] = useState<User | null>(null);

  useEffect(() => {
    spotify.users
      .profile(playlist.owner.id)
      .then((user) => setOwner(user))
      .catch((e) => {
        console.error('Error while trying to fetch playlist owner:', e);
        setOwner(null);
      });
  }, [playlist.owner.id, spotify.users]);

  return (
    <div className="flex flex-col gap-2">
      <img
        className="w-52 rounded self-center"
        src={playlist.images[0].url}
        alt={`Cover of ${playlist.name} by ${playlist.owner.display_name}.`}
        width={208}
        height={208}
      />
      <h1 className="text-lg">{playlist.name}</h1>
      <p className="text-subdued text-xs">{DOMPurify.sanitize(decode(playlist.description))}</p>
      <div className="flex flex-row items-center gap-2">
        {owner && owner.images.length > 0 && (
          <img
            className="h-4 rounded-full"
            src={owner.images[owner.images.length - 1].url}
            alt={`Profile picture of ${owner.display_name}`}
            width={16}
            height={16}
          />
        )}
        <p className="text-sm font-bold">{playlist.owner.display_name}</p>
      </div>
    </div>
  );
};
