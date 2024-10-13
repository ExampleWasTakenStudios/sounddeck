import { Playlist, User } from '@spotify/web-api-ts-sdk';
import DOMPurify from 'dompurify';
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

  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A') {
      const href = node.getAttribute('href');
      console.log('HREF', href);
      if (href && /spotify:playlist:[A-Za-z0-9]+/g.test(href)) {
        node.classList.add('text-green', 'underline', 'underline-offset-1');
      } else {
        node.removeAttribute('href');
      }
    }
  });

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:border-b sm:border-green/50 sm:pb-4">
      <img
        className="w-52 rounded self-center"
        src={playlist.images[0].url}
        alt={`Cover of ${playlist.name} by ${playlist.owner.display_name}.`}
        width={208}
        height={208}
      />
      <div className="sm:ml-3 sm:flex sm:flex-col sm:justify-between">
        <div></div>
        <h1 className="text-lg sm:text-3xl">{playlist.name}</h1>

        <div className="sm:flex sm:flex-col sm:gap-2">
          <p
            className="text-subdued text-xs"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(playlist.description, {
                ALLOWED_ATTR: ['href', 'class'],
                ALLOWED_URI_REGEXP: /^spotify:playlist:[A-Za-z0-9]+$/,
              }),
            }}
          ></p>

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
      </div>
    </div>
  );
};
