import { ReactNode } from 'react';

interface FabProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

export const Fab = ({ onClick, children }: FabProps) => {
  return (
    <div
      className="fixed bottom-20 right-6 w-14 aspect-square flex justify-center items-center drop-shadow bg-green text-black rounded-2xl cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
