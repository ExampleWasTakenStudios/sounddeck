import { Search } from 'lucide-react';
import { ReactNode } from 'react';

interface MainSearchBarProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  suggestions: ReactNode;
}

export const MainSearchBar = ({ onChange, suggestions }: MainSearchBarProps) => {
  return (
    <>
      <search className="relative outline-none bg-white text-black rounded px-4 py-3 sm:w-96 flex flex-row justify-between items-center gap-3 transition-shadow focus-within:ring focus-within:ring-green">
        <input
          className="w-full placeholder-dark-subdued outline-none"
          onChange={onChange}
          type="text"
          placeholder="Search for Spotify Mixes"
        />
        <Search color="#000" />

        {suggestions && (
          <div className="flex flex-col gap-2 p-2 absolute top-12 border border-green border-t-0 rounded rounded-t-none left-0 backdrop-blur-lg bg-gradient-to-b from-green/50 to-purple/70 w-full ">
            {suggestions}
          </div>
        )}
      </search>
    </>
  );
};
