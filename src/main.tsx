import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './Root';
import { ErrorPage } from './ErrorPage';
import { DesignSystem } from './routes/DesignSystem';
import { RootIndex } from './routes/RootIndex';
import { Login } from './routes/login/Login';

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
        path: 'login',
        element: <Login />,
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
