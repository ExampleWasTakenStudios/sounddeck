interface PlaylistCardProps {
  title: string;
  width: number;
  coverUrl: string;
}

export const PlaylistCard = ({ title, width, coverUrl }: PlaylistCardProps) => {
  return (
    <div className="flex flex-col gap-1 aspect-square w-full transition-transform ease-out active:scale-95">
      <img
        width={width}
        height={width}
        className="rounded-md aspect-square"
        src={coverUrl}
        alt="Playlist cover"
        loading="lazy"
      />
      <h1>{title}</h1>
    </div>
  );
};
