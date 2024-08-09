import { Music } from 'lucide-react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  content: string;
  children?: ReactNode;
}

export const EmptyState = ({ content, children }: EmptyStateProps) => {
  return (
    <main className="bg-black text-white m-20 flex flex-col justify-center items-center text-center">
      <Music size={90} strokeWidth={0.5} />
      <p className="mb-5 text-subdued">{content}</p>
      {children}
    </main>
  );
};
