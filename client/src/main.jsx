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
