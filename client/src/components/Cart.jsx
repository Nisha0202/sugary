import React, { useState, useEffect } from 'react';
import { useCart, useDispatchCart } from "../../state/ContextReducer";
import { MdDeleteForever } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import SuccessAlert from '../Alert/SuccessAlert';
import axios from 'axios';
import moment from 'moment';
import { jwtDecode } from "jwt-decode";


const Cart = ({ onClose}) => { 
    const cart = useCart();
    const dispatch = useDispatchCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [displayDateTime, setDisplayDateTime] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [admin, setAdmin] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    

    const token = localStorage.getItem('sugaryToken');
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setAdmin(decoded.isAdmin);
                setUser(decoded.username);
                setEmail(decoded.email);
                console.log(user);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [token]);

    useEffect(() => {
        const now = moment().add(1, 'day').startOf('day');
        setSelectedDateTime(now.format('YYYY-MM-DDTHH:mm'));
        setDisplayDateTime(now.format('DD/MM/YYYY h:mm A'));
    }, []);

    const handleDeleteItem = (index) => {
        dispatch({ type: 'REMOVE', index });
    };

    const handleSetTimeClick = () => {
        setShowModal(true);
    };

    const handleOrderClick = () => {
        const now = moment().add(1, 'day').startOf('day').format('YYYY-MM-DDTHH:mm');

        if (moment(selectedDateTime).isBefore(now)) {
            setError('The selected date and time must be at least one day ahead of the current date.');
            return;
        }

        if (selectedDateTime && location.trim() !== '') {
            setShowConfirmDialog(true);
        } else {
            setError('Please select date, time, and enter location.');
        }
    };

    const handleCalendarSelect = (e) => {
        const dateTime = e.target.value;
        setSelectedDateTime(dateTime);
        setDisplayDateTime(moment(dateTime).format('DD/MM/YYYY h:mm A'));
    };

    const handleConfirmOrder = async () => {
        try {
            const orderData = {
                username: user,
                useremail: email,
                items: cart.map(item => ({
                    
                    name: item.name,
                    size: item.size,
                    quantity: item.qty,
                })),
                dateTime: displayDateTime,
                location,
                bill: totalPrice,
            };

            const response = await axios.post('http://localhost:5000/api/orderlist', orderData);
            if (response.status === 201) {
                setSuccess('Order placed successfully!');
                dispatch({ type: 'CLEAR' });
                setShowConfirmDialog(false);
                setShowModal(false);
            } else {
                setError('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setError('There was an error placing the order. Please try again.');
        }
    };

    const handleCancelOrder = () => {
        setShowConfirmDialog(false);
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
                        {cart.map((item, index) => (
                            <li key={index} className="flex justify-between items-center mb-4">
                                <p className="text-sm w-2/5">
                                    {item.qty} {item.size === 6 ? "(Regular) " : "(Large) "}
                                    {item.qty === 1 ? "box" : "boxes"}
                                </p>
                                <div className="text-sm w-3/5">
                                    <div className='text-lg font-medium w-full text-black'>{item.name}</div>
                                    <div>{item.qty * item.size} pieces</div>
                                </div>
                                <p className="text-sm w-1/5 text-right">{item.price.toFixed(0)} Tk</p>
                                <MdDeleteForever
                                    className="text-xl ms-3 text-red-600 hover:text-red-700 cursor-pointer"
                                    onClick={() => handleDeleteItem(index)}
                                />
                            </li>
                        ))}
                    </ul>
                )}

                <div className='flex mt-4 pt-2 border-t-2 justify-between items-center'>
                    <div className="flex-1">Total:<span className='font-bold ms-2 text-lg'>{totalPrice.toFixed(2)} Tk</span></div>
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

                {/* Confirmation Dialog */}
                {showConfirmDialog && (
                    <div className="fixed inset-0 flex text-black items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="bg-gray-100 px-4 py-6 border border-gray-300 rounded shadow w-72 relative">
                            <button
                                className="absolute top-2 right-2 text-xl text-black"
                                onClick={handleCancelOrder}
                            >
                                <IoIosClose />
                            </button>
                            <h3 className="mb-4 text-start text-base">Are you sure you want to place this order?</h3>
                            <div className="flex justify-end">
                                <button className="btn btn-ghost btn-sm text-red-500 mr-2" onClick={handleCancelOrder}>
                                    Cancel
                                </button>
                                <button className="btn btn-ghost btn-sm text-green-500" onClick={handleConfirmOrder}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {success && <SuccessAlert className='w-full inset-0' message={success}/>}
            </div>
        </div>
    );
};

export default Cart;

