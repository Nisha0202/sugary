import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt1 } from "react-icons/hi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";
import Sure from '../Alert/Sure';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMenuActive = location.pathname === '/menu';
  const token = localStorage.getItem('sugaryToken');
  const [admin, setAdmin] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
  };

  const handleLogout = () => {
    localStorage.removeItem('sugaryToken');
    setShowConfirmDialog(false); // Hide dialog
    navigate('/login'); // Redirect to login page after logout
  };

  const handleCancel = () => {
    setShowConfirmDialog(false); // Hide dialog
  };

  return (
    <div className='navbar-container bg-white'>
      <div className="navbar max-w-[1180px] bg-white px-2 hover:bg-none fixed">
        <div className="navbar-start">
          {/* menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="mr-4 lg:hidden">
              <HiMenuAlt1 className='text-lg' />
            </div>
            {/* hamburger */}
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
              {token && (
                <li>
                  <NavLink
                    to="/my-orders"
                    className={({ isActive }) =>
                      isActive ? "font-bold bg-transparent focus:bg-transparent hover:bg-gray-400" : ""
                    }
                  >
                    My Orders
                  </NavLink>
                </li>
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
          <NavLink
            to="/" className="text-lg text-pink-600 font-semibold">Sugary</NavLink>
        </div>
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
                  to="/my-orders"
                  className={({ isActive }) =>
                    isActive ? "font-bold bg-transparent focus:bg-transparent" : "hover:none"
                  }
                >
                  My Orders
                </NavLink>
              </li>
            )}
            {token && admin && (
              <li>
                <NavLink
                  to="/my-orders"
                  className={({ isActive }) =>
                    isActive ? "font-bold bg-transparent focus:bg-transparent" : "hover:none"
                  }
                >
                  Orders
                </NavLink>
              </li>
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
        <div className="navbar-end flex items-center text-sm rounded-md gap-1">
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              isActive ? "p-2 hover:bg-gray-200 rounded mx-4" : "p-2 hover:bg-gray-200 hover:text-text rounded-md"}
          >
            <BsFillCartCheckFill className='text-lg text-green-600 hover:text-text'></BsFillCartCheckFill>
          </NavLink>
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
