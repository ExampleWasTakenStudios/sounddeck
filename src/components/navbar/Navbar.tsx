import clsx from 'clsx';
import { Library, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const currentItem = location.pathname.split('/')[1];

  const iconSize = 26;

  return (
    <nav className="backdrop-blur bg-black/50 h-20 w-screen fixed bottom-0 left-0 flex flex-row justify-around items-center">
      <Link to="/search" className="flex flex-col justify-center items-center">
        <Search size={iconSize} className={clsx(currentItem === 'search' ? 'stroke-white' : 'text-subdued')} />
        <p className={clsx(currentItem === 'search' ? 'text-white' : 'text-subdued')}>Search</p>
      </Link>
      <Link to="/library" className="flex flex-col justify-center items-center">
        <Library size={iconSize} className={clsx(currentItem === 'library' ? 'stroke-white' : 'text-subdued')} />
        <p className={clsx(currentItem === 'library' ? 'text-white' : 'text-subdued')}>Library</p>
      </Link>
    </nav>
  );
};
