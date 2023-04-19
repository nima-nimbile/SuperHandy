import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/Login';
import CustomerPage from './components/CustomerPage'
import CustomerHistory from './components/CustomerHistory';

import Handyperson from './components/Handyperson';
import HandypersonHistory from './components/Handyperson_history';
import Register from './components/Register';
import HandyDash from './components/HandyDash';
import Navbar from './components/Navbar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/login",
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
  {
    path: "/customerPage",
    element: <CustomerPage/>,
  },
  {
    path: "/customerHistory",
    element: <CustomerHistory/>,
  },
  {
    path: "/Handyperson",
    element: <Handyperson/>,
  },
  {
    path: "/Handyperson_history",
    element: <HandypersonHistory/>,
  },
  {
    path: "/",
    element: <Navbar/>,
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

