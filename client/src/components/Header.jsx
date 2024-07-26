import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <div className="navbar bg-base-100 focus:bg-transparent px-0 hover:bg-none">
      <div className="navbar-start">
        {/* menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="mr-4 lg:hidden bg-base-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          {/* hamburger */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
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
        <div className="text-xl text-pink-600 font-semibold">Sugary</div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 bg-transparent">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-bold bg-transparent focus:bg-transparent" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                isActive ? "font-bold bg-transparent focus:bg-transparent" : ""
              }
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? "font-bold bg-transparent focus:bg-transparent" : ""
              }
            >
              Menu
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <NavLink to="/login" className="btn btn-sm text-green-600 tracking-wider rounded-md">
          Login
        </NavLink>
      </div>
    </div>
  )
}
