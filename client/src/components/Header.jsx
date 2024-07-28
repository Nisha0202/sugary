import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { HiMenuAlt1 } from "react-icons/hi";
import { BsFillCartCheckFill } from "react-icons/bs";

export default function Header() {
  const location = useLocation()
  const isMenuActive = location.pathname === '/menu'

  return (
    <div className='navbar-container'>
       <div className="navbar max-w-[1180px] bg-base-100 focus:bg-transparent px-2 hover:bg-none fixed">
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
                isActive ? "font-bold bg-transparent focus:bg-transparent" : "hover:none" }>
              Menu
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex items-center text-sm rounded-md">
      <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? "p-2 bg-gray-200 rounded mx-4" : "p-2 bg-gray-200 border-2 rounded-md mx-4" }>
              <BsFillCartCheckFill className='text-lg  text-green-600 hover:text-text'></BsFillCartCheckFill>
            </NavLink>
        <NavLink to="/login" className=" border-2 px-4 py-2 font-bold text-green-600 hover:text-text bg-gray-200 tracking-wider rounded-md">
          Login
        </NavLink>
      </div>
    </div>
    </div>
   
  )
}

