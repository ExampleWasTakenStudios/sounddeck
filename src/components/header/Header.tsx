import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="h-14 min-h-14 flex justify-center items-center shadow shadow-green">
      <h1 className="text-2xl font-thin">
        <Link to="/">SoundDeck</Link>
      </h1>
    </header>
  );
};
