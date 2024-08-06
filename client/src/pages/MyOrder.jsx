import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode"; // Remove the curly braces around jwtDecode


const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        const token = localStorage.getItem('sugaryToken');
        if (token) {
            const decoded = jwtDecode(token);
            setEmail(decoded.email); 
            
        } else {
            setIsAdmin(false);
        }
    }, []);
console.log(email);

useEffect(() => {
    if (email) {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`https://sugary-backend.vercel.app/api/orderlist/${email}`);
                if (response.data && Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    throw new Error('Unexpected response format');
                }
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
}, [email]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!orders)  return (
        <div  className='min-h-[calc(100vh-268px)]
        flex items-center justify-center'>
          <h1 className='text-red-600 text-lg '>You haven't placed any orders yet!</h1>
        </div>
      );
    

    return (
        <div className="px-4 min-h-screen">
            <h1 className="text-lg font-medium text-primary my-4 text-center w-full">My Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-gray-300 font-medium">
                        <tr>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2 w-1/6">Date & Time</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Bill</th>
                            <th className="px-4 py-2">Items</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className={`text-gray-700 ${order.isConfirmed ? 'bg-gray-200' : ''}`}>
                                <td className="border px-4 py-2">{order.username}</td>
                                <td className="border px-4 py-2">{order.dateTime}</td>
                                <td className="border px-4 py-2 text-wrap">{order.location}</td>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrder;
