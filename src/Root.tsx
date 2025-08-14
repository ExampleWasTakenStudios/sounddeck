import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';

export const Root = () => {
  return (
    <div className="bg-black text-white font-sans-serif min-h-screen min-w-screen h-full w-full flex flex-col">
      <Header />

      <main className="h-full m-4 flex flex-col gap-3 mb-[170px]">
        <Outlet />
      </main>
    </div>
  );
};
