import { Link, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error('Route Error:', error);

  return (
    <div className="bg-black text-white w-screen h-screen px-10 flex flex-col justify-center items-center gap-5 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <img
        className="rounded-lg"
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXZxOXkyMWg2cHU5azIwNnAwMWJkMGUwdHQzYXdhMm1ya3FvbGozZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U17JjFGv0DuMmVH4S7/giphy.webp"
        alt="Taylor Swift looking disappointed"
      />
      <p className="text-subdued">We can't seem to find the page you are looking for.</p>
      <Link to="/">Home</Link>
    </div>
  );
};
