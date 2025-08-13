import { Image } from '@spotify/web-api-ts-sdk';
import { useOptimalImage } from '../../../hooks/useOptimalImage';

export interface MainSearchSuggestionsProps {
  title: string;
  artists: string;
  covers: Image[];
}

export const MainSearchSuggestions = ({ title, artists, covers }: MainSearchSuggestionsProps) => {
  const getOptimalImage = useOptimalImage();

  return (
    <div className="w-full flex flex-row items-center gap-2 transition-all ease-out active:scale-95">
      <img
        className="h-14 aspect-square object-cover rounded-sm"
        src={getOptimalImage(covers, 56, 56).url}
        alt={`Cover of ${title} by ${artists}.`}
        width={56}
        height={56}
      />

      <div className="w-full truncate flex flex-col justify-between">
        <h1 className="text-white truncate">{title}</h1>
        <h2 className="font-light text-white truncate">{artists}</h2>
      </div>
    </div>
  );
};
