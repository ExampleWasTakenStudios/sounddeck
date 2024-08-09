import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicSpinner } from '../../components/spinners/BasicSpinner';

export const OAuth2Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <BasicSpinner />
      <p>Success! You will be redirected shortly.</p>
    </div>
  );
};
