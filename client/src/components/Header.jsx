import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { HiMenuAlt1 } from "react-icons/hi";
export default function Header() {
  const location = useLocation()
  const isMenuActive = location.pathname === '/menu'

  return (
    <div className="navbar bg-base-100 focus:bg-transparent px-0 hover:bg-none">
      <div className="navbar-start">
        {/* menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="mr-4 lg:hidden bg-base-100">
        <  HiMenuAlt1 className='text-lg'/>
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
        <NavLink  NavLink
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
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? "font-bold bg-transparent focus:bg-transparent" : "hover:none"
              }
            >
              Menu
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex items-center text-sm rounded-md">
        {/* {isMenuActive && (
          <input
            type="text"
            placeholder="Search..."
            className="input focus:ring-0 input-sm input-bordered mr-4  flex items-center  gap-2 text-black rounded-md"
          />
        )} */}
        <NavLink to="/login" className="btn btn-sm text-green-600 tracking-wider rounded-md">
          Login
        </NavLink>
      </div>
    </div>
  )
}

