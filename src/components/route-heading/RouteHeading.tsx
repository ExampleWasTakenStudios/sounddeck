export interface RouteHeadingProps {
  title: string;
}

export const RouteHeading = ({ title }: RouteHeadingProps) => {
  return <h1 className="my-5 text-2xl font-thin">{title}</h1>;
};
