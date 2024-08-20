interface PlaylistCardProps {
  title: string;
  coverUrl: string;
}

export const PlaylistCard = ({ title, coverUrl: coverPath }: PlaylistCardProps) => {
  return (
    <div className="flex flex-col gap-1 aspect-square w-full transition-transform ease-out active:scale-95">
      <img
        width={200}
        height={200}
        className="rounded-md aspect-square"
        src={coverPath}
        alt="Playlist cover"
        loading="lazy"
      />
      <h1>{title}</h1>
    </div>
  );
};
