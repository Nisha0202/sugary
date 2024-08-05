import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import Sure from '../Alert/Sure';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('sugaryToken');
        if (token) {
            const decoded = jwtDecode(token);
            setIsAdmin(decoded.isAdmin); // Assuming 'isAdmin' is a boolean property
        } else {
            setIsAdmin(false);
        }
    }, []);

    useEffect(() => {
        if (isAdmin) {
            const fetchOrders = async () => {
                try {
                    const response = await axios.get('https://sugary-backend.vercel.app/api/orderlist');
                    setOrders(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                    setError('Failed to fetch orders');
                    setLoading(false);
                }
            };
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [isAdmin]);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://sugary-backend.vercel.app/api/orders/${selectedOrderId}`);
            setOrders(orders.filter(order => order._id !== selectedOrderId));
            setShowConfirm(false);
            setSelectedOrderId(null);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleConfirm = async (id) => {
        try {
            const response = await axios.patch(`https://sugary-backend.vercel.app/api/orders/${id}/confirm`);
            setOrders(orders.map(order => order._id === id ? response.data : order));
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    if (!isAdmin) {
        return (
            <div className='min-h-[calc(100vh-268px)] flex items-center justify-center'>
                <h1 className='text-red-600 text-lg'>Not Authorized</h1>
            </div>
        );
    }

    if (error) return <div>{error}</div>;

    return (
        <div className="px-4 min-h-screen">
            <h1 className="text-lg font-medium text-primary my-4 text-center w-full">All Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-gray-300 font-medium">
                        <tr>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Date & Time</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Bill</th>
                            <th className="px-4 py-2">Items</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className={`text-gray-700 ${order.isConfirmed ? 'bg-gray-200' : ''}`}>
                                <td className="border px-4 py-2">{order.username}</td>
                                <td className="border px-4 py-2">{order.dateTime}</td>
                                <td className="border px-4 py-2">{order.location}</td>
                                <td className="border px-4 py-2">{order.bill} Tk</td>
                                <td className="border px-4 py-2">
                                    <ul className="list-disc list-inside">
                                        {order.items.map((item, index) => (
                                            <li key={index}>
                                                {item.quantity} {item.size === 6 ? "(Regular) " : "(Large) "}
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="border px-4 py-2">
                                    {!order.isConfirmed && (
                                        <button 
                                            onClick={() => handleConfirm(order._id)} 
                                            className="text-primary text-xl mr-2"
                                        >
                                            <IoCheckmarkDoneCircleSharp />
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => {
                                            setSelectedOrderId(order._id);
                                            setShowConfirm(true);
                                        }} 
                                        className="text-lg text-text"
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showConfirm && (
                <Sure
                    message="Are you sure you want to delete this order?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};

export default AllOrders;
