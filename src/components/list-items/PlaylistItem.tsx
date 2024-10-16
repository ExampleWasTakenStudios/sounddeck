interface PlaylistItemProps {
  title: string;
  owner: string;
  coverUrl: string;
}

export const PlaylistItem = ({ title, owner, coverUrl }: PlaylistItemProps) => {
  return (
    <div className="group w-full flex flex-row items-center gap-3 transition-all ease-out hover:bg-subdued/20 rounded active:scale-95">
      <img
        className="h-14 rounded-sm group-hover:rounded-tr-none"
        src={coverUrl}
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
