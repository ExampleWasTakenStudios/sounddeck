import { CircleAlert } from 'lucide-react';

interface TrackListItemProps {
  title: string;
  artist: string;
  explicit?: boolean;
  coverUrl: string;
}

export const TrackListItem = ({ title, artist, coverUrl }: TrackListItemProps) => {
  return (
    <div className="w-full flex flex-row items-center gap-2 transition-transform ease-out active:scale-95">
      <img className="h-14 rounded-sm" src={coverUrl} alt={`Cover of ${title} by ${artist}.`} />
      <div className="w-full truncate flex flex-col justify-between">
        <h1 className="truncate">{title}</h1>
        <div className="flex flex-row items-center gap-1">
          <CircleAlert className="text-subdued" size={16} />
          <h2 className="font-light text-subdued">{artist}</h2>
        </div>
      </div>
    </div>
  );
};
