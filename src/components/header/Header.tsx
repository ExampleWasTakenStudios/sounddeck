import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 h-14 min-h-14 w-full flex justify-center items-center bg-black shadow shadow-green">
      <h1 className="text-2xl font-thin">
        <Link to="/">SoundDeck</Link>
      </h1>
    </header>
  );
};
