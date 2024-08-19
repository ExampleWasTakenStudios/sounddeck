import clsx from 'clsx';
import { Library, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const currentItem = location.pathname.split('/')[1];

  const searchCss = clsx(currentItem === 'search' ? 'text-white' : 'text-dark-subdued');
  const libraryCss = clsx(currentItem === 'library' ? 'text-white' : 'text-dark-subdued');

  const iconSize = 26;

  return (
    <nav className="backdrop-blur bg-black/50 h-14 w-screen fixed bottom-0 left-0 flex flex-row justify-around items-center">
      <Link to="/search">
        <Search size={iconSize} className={searchCss} />
      </Link>
      <Link to="/library">
        <Library size={iconSize} className={libraryCss} />
      </Link>
    </nav>
  );
};
