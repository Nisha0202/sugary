import React from 'react'

export default function Header() {
  return (
    <>

    <div className="navbar bg-base-100 px-0">
  <div className="navbar-start">
    {/* menu */}
    <div className="dropdown">
      <div tabIndex={0} role="button" className="mr-2 lg:hidden">
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
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
           <li><a>Home</a></li>
           <li><a>My Orders</a></li>
      </ul>
    </div>
    <a className="text-xl text-pink-600 font-semibold">Sugary</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Home</a></li>
      <li><a>My Orders</a></li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn btn-sm text-green-600 tracking-wider rounded-md">Login</a>
  </div>
</div>
    </>
  )
}
