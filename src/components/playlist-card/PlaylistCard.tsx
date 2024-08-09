interface PlaylistCardProps {
  title: string;
  coverPath: string;
}

export const PlaylistCard = ({ title, coverPath }: PlaylistCardProps) => {
  return (
    <div className="flex flex-col gap-1 transition-transform ease-out active:scale-95">
      <img className="rounded-md" src={coverPath} alt="Playlist cover" />
      <h1>{title}</h1>
    </div>
  );
};
