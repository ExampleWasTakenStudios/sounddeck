import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthGuard } from './AuthGuard';
import { ErrorPage } from './ErrorPage';
import { Root } from './Root';
import { Playlist } from './routes/[playlist]/Playlist';
import { SavePlaylist } from './routes/[playlist]/SavePlaylist';
import { Library } from './routes/library/Libary';
import { Login } from './routes/login/Login';
import { OAuth2 } from './routes/oauth2/OAuth2';
import { Search } from './routes/search/Search';
import './tailwind.css';

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          {
            path: 'oauth2',
            element: <OAuth2 />,
          },
          {
            path: 'search',
            element: <Search />,
          },
          {
            path: 'library',
            element: <Library />,
          },
          {
            path: '/playlist/:playlistId',
            element: <Playlist />,
          },
          {
            path: '/playlist/:playlistId/save',
            element: <SavePlaylist />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
