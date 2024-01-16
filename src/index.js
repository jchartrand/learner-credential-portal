import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css';
import Root from './routes/root';
import SignIn from './routes/SignIn';
import CredentialList from './routes/credentialList';
import CredentialCollector from './routes/credentialCollector';
import Demo from './routes/Demo';
import ErrorPage from './errorPage';

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/lcp",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/lcp",
        element: <SignIn/>,
      },
      {
        path: "/lcp/credentials",
        element: <CredentialList/>,
      },
      {
        path: "/lcp/demo",
        element: <Demo/>,
      },
      {
        path: "/lcp/collector",
        element: <CredentialCollector/>,
      }
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





