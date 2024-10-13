import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  content: string;
}

export const BackButton = ({ content }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row cursor-pointer md:hidden" onClick={() => navigate(-1)}>
      <ChevronLeft />
      <p>{content}</p>
    </div>
  );
};
