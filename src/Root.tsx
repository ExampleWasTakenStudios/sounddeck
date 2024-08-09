import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';

export const Root = () => {
  return (
    <div className="bg-black text-white font-sans-serif min-h-screen min-w-screen flex flex-col">
      <Header />

      <main className="m-4 flex flex-col gap-3 mb-14">
        <Outlet />
      </main>
    </div>
  );
};
