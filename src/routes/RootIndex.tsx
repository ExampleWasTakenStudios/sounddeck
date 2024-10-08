import { Link } from 'react-router-dom';

export const RootIndex = () => {
  return (
    <>
      <h1 className="text-xl">Home</h1>
      <ul className="mx-6">
        <li className="list-disc">
          <Link className="text-green underline underline-offset-2" to="/login">
            Login
          </Link>
        </li>
        <li className="list-disc">
          <Link className="text-green underline underline-offset-2" to="/search">
            Search
          </Link>
        </li>
        <li className="list-disc">
          <Link className="text-green underline underline-offset-2" to="/library">
            Library
          </Link>
        </li>
      </ul>
    </>
  );
};
