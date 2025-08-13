import { Image } from '@spotify/web-api-ts-sdk';
import { useOptimalImage } from '../../hooks/useOptimalImage';

interface PlaylistItemProps {
  title: string;
  owner: string;
  covers: Image[];
}

export const PlaylistItem = ({ title, owner, covers }: PlaylistItemProps) => {
  const getOptimalImage = useOptimalImage();

  return (
    <div className="group w-full flex flex-row items-center gap-3 transition-all ease-out hover:bg-subdued/20 rounded active:scale-95">
      <img
        className="h-14 rounded-sm group-hover:rounded-tr-none"
        src={getOptimalImage(covers, 56, 56).url}
        alt={`Cover of ${title} created by ${owner}.`}
        width={56}
        height={56}
      />
      <div className="w-full truncate flex flex-col justify-between">
        <h1 className="truncate">{title}</h1>
        <h2 className="font-light text-subdued">{owner} &bull; Playlist</h2>
      </div>
    </div>
  );
};
