import DOMPurify from 'dompurify';
import { decode } from 'html-entities';

// TODO: this should just take the playlist object returned from the api
interface PlaylistHeaderProps {
  title: string;
  description: string;
  coverUrl: string;
  owner: string;
  ownerProfilePictureUrl: string;
}

export const PlaylistHeader = ({
  title,
  description,
  coverUrl,
  owner,
  ownerProfilePictureUrl,
}: PlaylistHeaderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <img
        className="w-52 rounded self-center"
        src={coverUrl}
        alt={`Cover of ${title} by ${owner}.`}
        width={208}
        height={208}
      />
      <h1 className="text-lg">{title}</h1>
      <p className="text-subdued text-xs">{DOMPurify.sanitize(decode(description))}</p>
      <div className="flex flex-row items-center gap-2">
        <img className="h-4 rounded-full" src={ownerProfilePictureUrl} alt={`Profile picture of ${owner}`} />
        <p className="text-sm font-bold">{owner}</p>
      </div>
    </div>
  );
};
