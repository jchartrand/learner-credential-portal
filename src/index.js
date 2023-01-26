import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css';
import Root from './routes/root';
import CredentialList from './routes/credentialList';
import Demo from './routes/Demo';

import ErrorPage from './errorPage';
import reportWebVitals from './reportWebVitals';
import SignIn from './routes/SignIn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <SignIn/>,
      },
      {
        path: "/credentials",
        element: <CredentialList/>,
      },
      {
        path: "/demo",
        element: <Demo/>,
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





