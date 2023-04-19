import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/Login';
import Register from './components/Register';
import HandyDash from './components/HandyDash';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/handyDash",
    element: <HandyDash/>,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

