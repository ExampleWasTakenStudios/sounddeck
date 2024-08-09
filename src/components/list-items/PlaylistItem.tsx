interface PlaylistItemProps {
  title: string;
  owner: string;
  coverUrl: string;
}

export const PlaylistItem = ({ title, owner, coverUrl }: PlaylistItemProps) => {
  return (
    <div className="w-full flex flex-row items-center gap-2">
      <img className="h-11 rounded-sm" src={coverUrl} alt="Playlist cover" />
      <div className="w-full truncate flex flex-col justify-between">
        <h1 className="truncate">{title}</h1>
        <h2 className="font-light text-subdued">{owner} &bull; Playlist</h2>
      </div>
    </div>
  );
};
