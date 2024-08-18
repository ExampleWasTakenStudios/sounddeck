import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import { Root } from './Root';
import { DesignSystem } from './routes/DesignSystem';
import { RootIndex } from './routes/RootIndex';
import { Login } from './routes/login/Login';
import { OAuth2Authentication } from './routes/oauth2/OAuth2Authentication';
import { OAuth2Authorization } from './routes/oauth2/OAuth2Authorization';
import { OAuth2Fail } from './routes/oauth2/OAuth2Fail';
import { OAuth2Success } from './routes/oauth2/OAuth2Success';
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
        path: 'search',
        element: <Search />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'oauth2',
        children: [
          {
            index: true,
            element: <OAuth2Authentication />,
          },
          {
            path: 'authorize',
            element: <OAuth2Authorization />,
          },
          {
            path: 'success',
            element: <OAuth2Success />,
          },
          {
            path: 'fail',
            element: <OAuth2Fail />,
          },
        ],
      },
      {
        path: 'design-system',
        element: <DesignSystem />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
