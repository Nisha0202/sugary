import React, { useState, useEffect, useNavi } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from "../../state/ContextReducer"; // Import useDispatchCart
import { jwtDecode } from 'jwt-decode';
import SuccessAlert from '../Alert/SuccessAlert';

const Card = ({ cupcake }) => {
    const [boxSize, setBoxSize] = useState(6);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const dispatch = useDispatchCart(); // Get dispatch function
    const token = localStorage.getItem('sugaryToken');
    const [isAdmin, setIsAdmin] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();




    useEffect(() => {

        if (token) {

            const decoded = jwtDecode(token);
            setIsAdmin(decoded.isAdmin); // Assuming 'isAdmin' is a boolean property
        }
    }, []);


    const cart = useCart()
    useEffect(() => {
        setPrice(boxSize === 6 ? cupcake.pricePerSix : cupcake.pricePerTwelve);
    }, [boxSize, cupcake.pricePerSix, cupcake.pricePerTwelve]);

    const handleBoxSizeChange = (event) => {
        const value = parseInt(event.target.value);
        setBoxSize(value);
        setPrice(value === 6 ? cupcake.pricePerSix : cupcake.pricePerTwelve);
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        setQuantity(value);
    };
    // Add a helper function to check if the date is recent
    const isRecent = (dateString) => {
        const dateParts = dateString.split(' ')[0].split('/').map(Number);
        const dateTime = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
        const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return dateTime < oneMonthAgo;
    };



    //   Add to Cart

    const handleAddToCart = async () => {

        if (!token) {
            navigate('/login');
            return; // Ensure no further code is executed
        }
    
        const existingItemIndex = cart.findIndex(item => item.id === cupcake._id && item.size === boxSize);
    
        if (existingItemIndex !== -1) {
            // Item exists in cart with the same size
            await dispatch({
                type: "UPDATE",
                id: cupcake._id,
                price: price,
                qty: cart[existingItemIndex].qty + quantity // Add the new quantity to the existing quantity
            });
            console.log("Item updated in cart.");
            setSuccess("Item updated in cart");

        } else {
            // Item does not exist in cart or size is different
            await dispatch({
                type: "ADD",
                id: cupcake._id,
                name: cupcake.title,
                price: price,
                qty: quantity,
                size: boxSize,
                img: cupcake.image
            });
            console.log("Item added to cart");
            setSuccess("Item added to cart");
        }
    };
    

    if (!cupcake) {
        return <div className='grid place-items-center my-4 text-xl font-semibold'>No menu item to show!</div>
    }

    return (
        <div className=" w-80 rounded-md flex justify-center items-center text-center flex-col border-2 overflow-hidden p-4 bg-transparent">

            <div className="w-72 h-[14rem] rounded-md indicator">
                <img
                    className="w-72 h-[14rem] rounded-md object-cover border-2 transform transition-transform duration-300 hover:scale-105"
                    src={cupcake.image}
                    alt={cupcake.title}
                />
                {cupcake.date && isRecent(cupcake.date) && (
                    <span className="indicator-item badge mr-4 mt-4 text-white border-0 bg-primary pt-2 pb-2.5">new</span>
                )}
            </div>
            <div className="py-4 w-full px-2">
                <div className='w-full justify-between flex items-center h-6'>
                    <div className="font-semibold flex flex-1 tracking-wide text-xl text-gray-800 ">{cupcake.title}</div>
                    <div className='text-sm'>{cupcake.weight}g each</div>
                </div>

            </div>
            <div className="px-2 w-full">
                {/* selection */}
                <div className='flex w-full  items-center font-medium gap-4'>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm w-full mb-2" htmlFor="boxSize">
                            Box Size:
                        </label>
                        <div className="relative">
                            <select
                                id="boxSize"
                                className="block py-2 px-4 min-w-28 w-full text-sm appearance-none bg-white border border-gray-400 hover:border-gray-500
                                 rounded leading-tight focus:outline-none focus:shadow-outline"
                                value={boxSize}
                                onChange={handleBoxSizeChange}
                            >
                                <option value={6}>6 pieces</option>
                                <option value={12}>12 pieces</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <IoMdArrowDropdown className='text-sm' />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm w-full mb-2" htmlFor="quantity">
                            Quantity of Box:
                        </label>
                        <select
                            id="quantity"
                            className="block py-2 px-4 appearance-none text-sm w-full bg-white border border-gray-400 hover:border-gray-500 
        rounded leading-tight focus:outline-none focus:shadow-outline"
                            value={quantity}
                            onChange={handleQuantityChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>

                </div>

                {/* result */}
                <div>
                    <p className="mt-2  ">Total Price: <span className=' text-pink-500 font-semibold'>{(price * quantity).toFixed(2)}Tk</span></p>
                </div>
                {/* action */}
                <div className='w-full flex items-center justify-between gap-4 mt-4'>

                    <button onClick={handleAddToCart} disabled={isAdmin} className="w-full flex py-2 items-center justify-center gap-2 border-2 border-green-600 text-green-600 tracking-wide
                     hover:bg-gray-300 font-bold rounded">
                        <FaCartPlus /> Add
                    </button>

                    <Link to={`/menu/${cupcake._id}`} className="w-full border-0 py-2 bg-gray-100 text-green-600 tracking-wide hover:bg-gray-300 font-bold  rounded">
                        More
                    </Link>

                </div>

            </div>
            {success && <SuccessAlert className='' message={success}/>}
        </div>
    );
};

export default Card;

