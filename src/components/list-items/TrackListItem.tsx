import { CircleAlert } from 'lucide-react';

interface TrackListItemProps {
  title: string;
  artist: string;
  explicit?: boolean;
  coverUrl: string;
}

export const TrackListItem = ({ title, artist, explicit, coverUrl }: TrackListItemProps) => {
  return (
    <div className="cursor-default w-full flex flex-row items-center gap-2 transition-all ease-out rounded">
      <img
        className="h-14 aspect-square object-cover rounded-sm"
        src={coverUrl}
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
