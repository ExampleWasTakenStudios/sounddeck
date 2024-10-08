import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpotify } from '../../hooks/useSpotify';

export interface RouteHeadingProps {
  title: string;
  userProfilePictureUrl: string;
}

export const RouteHeading = ({ title, userProfilePictureUrl }: RouteHeadingProps) => {
  const spotify = useSpotify();
  const navigate = useNavigate();
  const [userSettingsOpen, setUserSettingsOpen] = useState(false);

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="my-5 text-2xl font-thin">{title}</h1>
        <div className="relative">
          <img
            className="w-[30px] h-[30px] rounded-full aspect-square"
            src={userProfilePictureUrl}
            alt="Your Profile Picture"
            width={30}
            height={30}
            onClick={() => setUserSettingsOpen(!userSettingsOpen)}
          />
          {userSettingsOpen && (
            <div className="absolute z-10 top-[30px] right-0 w-28 p-1 bg-gray rounded">
              <div
                className="w-full h-10 rounded-sm p-1 flex items-center hover:bg-light-gray"
                onClick={() => {
                  spotify.logOut();
                  navigate('/login');
                }}
              >
                <p>Log out</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
