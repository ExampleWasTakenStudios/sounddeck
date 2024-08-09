import { Search } from 'lucide-react';

interface MainSearchBarProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const MainSearchBar = ({ onChange }: MainSearchBarProps) => {
  return (
    <search className="outline-none bg-white text-black rounded px-4 py-3 flex flex-row justify-between items-center gap-3 transition-shadow focus-within:ring focus-within:ring-green">
      <input
        className="w-full placeholder-dark-subdued outline-none"
        onChange={onChange}
        type="text"
        placeholder="Search for Spotify Mixes"
      />
      <Search color="#000" />
    </search>
  );
};
