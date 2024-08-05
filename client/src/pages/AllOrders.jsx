import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orderlist');
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="mt-4 px-4">
            <h1 className="text-lg font-medium text-primary mb-4 w-full text-center">All Orders</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white p-4 shadow-md rounded-md">
                        <h2 className="text-xl font-semibold mb-2">{order.username}</h2>
                        <p className="text-gray-600 mb-2">Date & Time: {order.dateTime}</p>
                        <p className="text-gray-600 mb-2">Location: {order.location}</p>
                        <p className="text-gray-600 mb-2">Bill: {order.bill} Tk</p>
                        <h3 className="font-semibold mb-1">Items:</h3>
                        <ul className="list-disc list-inside mb-2">
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    {item.quantity} {item.size === 6 ? "(Regular) " : "(Large) "}
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllOrders;
