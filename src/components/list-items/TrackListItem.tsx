import { Image } from '@spotify/web-api-ts-sdk';
import { CircleAlert } from 'lucide-react';
import { useOptimalImage } from '../../hooks/useOptimalImage';

interface TrackListItemProps {
  title: string;
  artist: string;
  explicit?: boolean;
  covers: Image[];
}

export const TrackListItem = ({ title, artist, explicit, covers }: TrackListItemProps) => {
  const getOptimalImage = useOptimalImage();

  return (
    <div className="w-full flex flex-row items-center gap-2 transition-all ease-out rounded">
      <img
        className="h-14 aspect-square object-cover rounded-sm"
        src={getOptimalImage(covers, 56, 56).url}
        alt={`Cover of ${title} by ${artist}.`}
        width={56}
        height={56}
      />
      <div className="w-full truncate flex flex-col justify-between">
        <h1 className="text-white truncate">{title}</h1>
        <div className="flex flex-row items-center gap-1">
          {explicit && <CircleAlert className="text-subdued min-w-[16px] min-h-[16px]" size={16} />}
          <h2 className="font-light text-subdued truncate">{artist}</h2>
        </div>
      </div>
    </div>
  );
};
