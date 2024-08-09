import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './Root';
import { ErrorPage } from './ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
