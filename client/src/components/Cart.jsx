import React, { useState, useEffect } from 'react';
import { useCart, useDispatchCart } from "../../state/ContextReducer";
import { MdDeleteForever } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

const Cart = ({ onClose }) => {
    const cart = useCart();
    const dispatch = useDispatchCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const [showModal, setShowModal] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [displayDateTime, setDisplayDateTime] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Set the default date and time to one day ahead of the current date
        const now = new Date();
        now.setDate(now.getDate() + 1); // Set to tomorrow
        const formattedDateTime = now.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:MM
        const displayDateTime = formatDateToDDMMYYYY(now); // For display purposes
        setSelectedDateTime(formattedDateTime);
        setDisplayDateTime(displayDateTime);
    }, []);

    // Function to format date to dd/mm/yy
    const formatDateToDDMMYYYY = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
        return `${day}/${month}/${year}`;
    };

    // Function to format date from dd/mm/yy to YYYY-MM-DDTHH:MM
    const formatDDMMYYToISO = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        const fullYear = 2000 + year; // Assuming year is in 00-99 range
        const date = new Date(fullYear, month - 1, day);
        return date.toISOString().slice(0, 16);
    };

    const handleDeleteItem = (index) => {
        console.log("Deleting item at index:", index);
        dispatch({ type: 'REMOVE', index });
    };

    const handleSetTimeClick = () => {
        setShowModal(true);
    };

    const handleOrderClick = () => {
        // Calculate the minimum date which is one day ahead of the current date
        const now = new Date();
        now.setDate(now.getDate() + 1);
        const minDate = now.toISOString().slice(0, 16);

        if (selectedDateTime <= minDate) {
            setError('The selected date and time must be at least one day ahead of the current date.');
            return;
        }

        if (selectedDateTime && location.trim() !== '') {
            console.log('Order placed with:', selectedDateTime, location);
            setShowModal(false);
        } else {
            setError('Please select date, time, and enter location.');
        }
    };

    const handleCalendarSelect = (e) => {
        const dateTime = e.target.value;
        setSelectedDateTime(dateTime);
        const selectedDate = new Date(dateTime);
        setDisplayDateTime(formatDateToDDMMYYYY(selectedDate));
    };

    return (
        <div role="alert" className="roboto fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 border border-gray-300 rounded shadow max-w-md w-full relative">
                <button className="absolute top-0 right-0 mt-2 text-xl mr-2 text-black" onClick={onClose}>
                    <IoIosClose />
                </button>
                <h2 className="mb-6 text-center w-full">Cart Items</h2>

                {cart.length === 0 ? (
                    <p className='text-lg text-center w-full'>No Item Added to Cart Yet</p>
                ) : (
                    <ul>
                        {cart.map((item, index) => {
                            const isRegular = item.size === 6;
                            const totalPieces = item.qty * item.size;
                            return (
                                <li key={index} className="flex justify-between items-center mb-4">
                                    <p className="text-sm w-2/5">
                                        {item.qty} {isRegular ? "(Regular) " : "(Large) "}
                                        {item.qty === 1 ? "box" : "boxes"}
                                    </p>
                                    <div className="text-sm w-3/5">
                                        <div className='text-lg font-medium w-full text-black'>{item.name} </div>
                                        <div>{totalPieces} pieces</div>
                                    </div>
                                    <p className="text-sm w-1/5 text-right">{item.price.toFixed(2)} Tk</p>
                                    <MdDeleteForever
                                        className="text-xl ms-3 text-red-600 hover:text-red-700 cursor-pointer"
                                        onClick={() => handleDeleteItem(index)}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                )}

                <div className='flex mt-4 pt-2 border-t-2 justify-between items-center'>
                    <div className="flex-1">Total:<span className='font-bold ms-2 text-lg'>{totalPrice.toFixed(2)} Tk</span></div>

                    {/* Set Time Button */}
                    <div className='btn btn-ghost btn-sm' onClick={handleSetTimeClick}>
                        Set Time and Location
                    </div>
                </div>

                {/* Modal for DateTime and Location */}
                {showModal && (
                    <div className="fixed inset-0 flex text-black items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="bg-gray-100 p-4 border border-gray-300 rounded shadow max-w-md w-full relative">
                            <button className="absolute top-0 right-0 mt-2 text-xl mr-2 text-black" onClick={() => setShowModal(false)}>
                                <IoIosClose />
                            </button>
                            <h3 className="mb-4 text-center">Set Date, Time, and Location</h3>
                            <div className="mb-4">
                                <label className="block">Date and Time:</label>
                                <input
                                    type="datetime-local"
                                    className="px-4 py-2 focus:outline-none rounded-md focus:ring-1 focus:ring-inset focus:ring-primary w-full mt-1 border-2 border-gray-300"
                                    value={selectedDateTime}
                                    onChange={handleCalendarSelect}
                                />
                                <p className="text-sm mt-2 text-gray-600">Selected Date: {displayDateTime}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block">Location:</label>
                                <input
                                    placeholder='Inside Dhaka'
                                    type="text"
                                    className="px-4 py-2 focus:outline-none rounded-md focus:ring-1 focus:ring-inset focus:ring-primary w-full mt-1 border-2 border-gray-300"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className={`btn btn-ghost btn-sm ${selectedDateTime && location.trim() ? 'text-pink-500 ' : ''}`}
                                    onClick={handleOrderClick}
                                >
                                    Place an Order
                                </button>
                            </div>
                            {error && <div className='text-red-600 font-medium'>{error}</div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
