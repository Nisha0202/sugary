import React from 'react';
import { useCart } from "../../state/ContextReducer"; // Import useCart
import { MdDeleteForever } from "react-icons/md";
const Cart = ({ onClose }) => {
    const cart = useCart(); // Access cart items
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    return (
        <div
        role="alert"
        className="roboto fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white p-4 border border-gray-300 rounded shadow max-w-md w-full relative">
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-black"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-lg tracking-wide text-text mb-6 text-center w-full">Cart Items</h2>
      
          {cart.length === 0 && <div>  <p className='text-xl'>No data found</p> </div>}
          {cart.length > 0 && (
            <ul>
              {cart.map((item, index) => {
                // Determine if the box size is 6 or not
                const isRegular = item.size === 6;
                const totalPieces = item.qty * item.size;
                return (
                  <li key={index} className="flex justify-between items-center mb-4">
            <p className="text-sm w-2/5">{item.qty} {isRegular ? "(Regular) " : "(Large) "}{item.qty === 1 ? "box" : "boxes"}</p>
                    <div className="text-sm w-3/5">
                    <div className='text-lg font-medium w-full'>{item.name} </div>
                    <div>{totalPieces} pieces</div>
                    </div>
                    <p className="text-sm w-1/5 text-right">{item.price.toFixed(2)} Tk</p>
                    <MdDeleteForever className="text-lg ms-2 text-red-500 hover:text-red-700 cursor-pointer" />
                  </li>
                );
              })}
            </ul>
          )}
          <div className=" mt-6 border-t-2 pt-4">Total:<span className='font-bold ms-2 text-lg'>{totalPrice.toFixed(2)} Tk</span></div>
        </div>
      </div>
    );
};

export default Cart;
