export interface RouteHeadingProps {
  title: string;
  userProfilePictureUrl: string;
}

export const RouteHeading = ({ title, userProfilePictureUrl }: RouteHeadingProps) => {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <h1 className="my-5 text-2xl font-thin">{title}</h1>
      <img
        className="w-[30px] h-[30px] rounded-full aspect-square"
        src={userProfilePictureUrl}
        alt="Your Profile Picture"
        width={10}
        height={10}
      />
    </div>
  );
};
