import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Root from './root/Root';
import ErrorPage from './components/ErrorPage';
import Home from './pages/Home';
import Menu from './pages/Menu';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import ForgotPassword from './password/ForgotPassword';
import ResetPassword from './password/ResetPassword';
import AddMenu from './pages/AddMenu';
import More from './components/More';
import axios from 'axios';
import { CartProvider } from '../state/ContextReducer';
import AllOrders from './pages/AllOrders';
import MyOrder from './pages/MyOrder';

const App = () => {
  const [cupcakes, setCupcakes] = useState([]);
  const apiUrl = 'https://sugary-backend.vercel.app';

  useEffect(() => {
    const fetchCupcakes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/get-items`);
        setCupcakes(response.data);
      } catch (error) {
        console.error("Error fetching cupcakes:", error);
      }
    };

    fetchCupcakes();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/menu", element: <Menu /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/login", element: <LogIn /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/add-menu", element: <AddMenu /> },
        { path: "/menu/:id", element: <More cupcakes={cupcakes} /> },
        { path: "/all-orders", element: <AllOrders/> },
        { path: "/my-order", element: <MyOrder/> }
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <CartProvider>
    <App />
  </CartProvider>
  </React.StrictMode>
);
