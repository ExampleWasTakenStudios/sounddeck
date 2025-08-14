import { Image } from '@spotify/web-api-ts-sdk';
import { useOptimalImage } from '../../hooks/useOptimalImage';

interface PlaylistCardProps {
  title: string;
  width: number;
  covers: Image[];
}

export const PlaylistCard = ({ title, width, covers }: PlaylistCardProps) => {
  const getOptimalImage = useOptimalImage();

  return (
    <div className="border flex flex-col gap-1 aspect-square w-full transition-transform ease-out active:scale-95">
      <img
        width={width}
        height={width}
        className="rounded-md aspect-square"
        src={getOptimalImage(covers, width, width).url}
        alt="Playlist cover"
        loading="lazy"
      />
      <h1>{title}</h1>
    </div>
  );
};
