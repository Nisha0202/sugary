import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt1 } from "react-icons/hi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";
import Sure from '../Alert/Sure';
import { useCart } from "../../state/ContextReducer";
import Cart from './Cart';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('sugaryToken');
  const [admin, setAdmin] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const cart = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);

  const [confirmDialogKey, setConfirmDialogKey] = useState(0);
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdmin(decoded.isAdmin);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [token]);

  const handleLogoutClick = () => {
    setShowConfirmDialog(true);
    console.log("logout");
    setConfirmDialogKey(prevKey => prevKey + 1);
  };

  const handleLogout = () => {

    localStorage.removeItem('sugaryToken');
    localStorage.removeItem('cart');
    setShowConfirmDialog(false);
    navigate('/login');
    location.reload();
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);

  };



  // Calculate the number of unique items in the cart
  const uniqueItemsCount = cart.length;

  return (
    <div className='navbar-container bg-white'>
      <div className="navbar max-w-[1180px] bg-white px-2 hover:bg-none fixed">
        <div className="navbar-start">
          {/* Menu Toggle for Mobile */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="mr-4 lg:hidden">
              <HiMenuAlt1 className='text-lg' />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-100 rounded-md z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "font-bold bg-transparent focus:bg-transparent hover:bg-gray-400" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              {token && !admin && (
                <li>
                  <NavLink
                    to="/my-order"
                    className={({ isActive }) =>
                      isActive ? "font-bold bg-transparent focus:bg-transparent hover:bg-gray-400" : ""
                    }
                  >
                    My Orders
                  </NavLink>
                </li>
              )}
              {token && admin && (
                <>
                  <li>
                    <NavLink
                      to="/all-orders"
                      className={({ isActive }) =>
                        isActive ? "font-bold bg-transparent focus:bg-transparent hover:bg-gray-400" : ""
                      }
                    >
                      Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/add-menu"
                      className={({ isActive }) =>
                        isActive ? "font-bold bg-transparent focus:bg-transparent hover:bg-gray-400" : ""
                      }
                    >
                      Add Menu
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    isActive ? "font-bold bg-transparent focus:bg-transparent hover:bg-gray-400" : ""
                  }
                >
                  Menu
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <NavLink to="/" className="text-lg text-pink-600 font-semibold">Sugary</NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 bg-transparent">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "font-bold bg-transparent focus:bg-transparent" : "hover:none"
                }
              >
                Home
              </NavLink>
            </li>
            {token && !admin && (
              <li>
                <NavLink
                  to="/my-order"
                  className={({ isActive }) =>
                    isActive ? "font-bold bg-transparent focus:bg-transparent" : "hover:none"
                  }
                >
                  My Orders
                </NavLink>
              </li>
            )}
            {token && admin && (
              <>
                <li>
                  <NavLink
                    to="/all-orders"
                    className={({ isActive }) =>
                      isActive ? "font-bold bg-transparent focus:bg-transparent" : "hover:none"
                    }
                  >
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-menu"
                    className={({ isActive }) =>
                      isActive ? "font-bold bg-transparent focus:bg-transparent" : "hover:none"
                    }
                  >
                    Add Menu
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  isActive ? "font-bold bg-transparent focus:bg-transparent" : "hover:none"}
              >
                Menu
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center text-sm rounded-md gap-1">
          <button
            onClick={() => setIsCartVisible(!isCartVisible)}
            className={isCartVisible ? "p-2 hover:bg-gray-200 rounded" : "p-2 hover:bg-gray-200 hover:text-text rounded-md"}
          >
            <BsFillCartCheckFill className='text-lg indicator text-green-600 hover:text-text' />
            {uniqueItemsCount > 0 && (
              <span className="ms-2 px-1.5 indicator-item indicator-middle indicator-end p-1 text-[10px] font-bold rounded-full text-white bg-pink-500">
                {uniqueItemsCount}
              </span>
            )}
          </button>

          {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}
          {token ? (
            <>
              <button
                onClick={handleLogoutClick}
                className="px-4 py-2 font-bold text-red-600 hover:text-text hover:bg-gray-200 tracking-wider rounded-md"
              >
                Log Out
              </button>
              {showConfirmDialog && (
                <Sure
                  key={confirmDialogKey}
                  message="Are you sure you want to log out?"
                  onConfirm={handleLogout}
                  onCancel={handleCancel}
                />
              )}
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 font-bold text-green-600 hover:text-text hover:bg-gray-200 tracking-wider rounded-md"
            >
              Log In
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
