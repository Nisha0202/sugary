import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './root/Root';
import FirbaseProvider from './FirebaseProbider/FirbaseProvider';
import ErrorPage from './components/ErrorPage'
import Home from './pages/Home';
import Menu from './pages/Menu';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import ForgotPassword from './password/ForgotPassword';
import ResetPassword from './password/ResetPassword';

import AddMenu from './pages/AddMenu';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/menu",
        element: <Menu/>,
      },
      {
        path: "/signup",
        element: <SignUp/>,
      },  {
        path: "/login",
        element: <LogIn/>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword/>,
      },
      {
        path: "/reset-password",
        element: <ResetPassword/>
      },
      {
        path: "/add-menu",
        element: <AddMenu/>
      }

 
 
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirbaseProvider>
      <RouterProvider router={router} />
    </FirbaseProvider>
  </React.StrictMode>
)
