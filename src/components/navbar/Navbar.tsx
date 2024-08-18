import clsx from 'clsx';
import { Library, Search } from 'lucide-react';

interface NavbarProps {
  currentItem: 'search' | 'library';
}

export const Navbar = ({ currentItem }: NavbarProps) => {
  const searchCss = clsx(currentItem === 'search' ? 'text-white' : 'text-dark-subdued');
  const libraryCss = clsx(currentItem === 'library' ? 'text-white' : 'text-dark-subdued');

  const iconSize = 26;

  return (
    <nav className="backdrop-blur bg-black/50 h-14 w-screen fixed bottom-0 left-0 flex flex-row justify-around items-center">
      <Search size={iconSize} className={searchCss} />
      <Library size={iconSize} className={libraryCss} />
    </nav>
  );
};
