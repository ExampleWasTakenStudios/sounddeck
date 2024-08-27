import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthGuard } from './AuthGuard';
import { ErrorPage } from './ErrorPage';
import { Root } from './Root';
import { DesignSystem } from './routes/DesignSystem';
import { RootIndex } from './routes/RootIndex';
import { Playlist } from './routes/[playlist]/Playlist';
import { SavePlaylist } from './routes/[playlist]/SavePlaylist';
import { Login } from './routes/login/Login';
import { OAuth2 } from './routes/oauth2/OAuth2';
import { Search } from './routes/search/Search';
import './tailwind.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <RootIndex />,
      },
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
            path: '/playlist/:playlistId',
            element: <Playlist />,
          },
          {
            path: '/playlist/:playlistId/save',
            element: <SavePlaylist />,
          },
        ],
      },
      {
        path: 'design-system',
        element: <DesignSystem />,
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
