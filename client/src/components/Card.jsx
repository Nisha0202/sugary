import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";
const Card = ({ cupcake }) => {
    const [boxSize, setBoxSize] = useState(6);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);

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
            <div className="py-4">
                <div className='w-full justify-between flex items-center h-6 px-2'>
                    <div className="font-semibold tracking-wide text-xl text-text">{cupcake.title}</div>
                    <div className='text-sm'>{cupcake.weight}g each</div>
                </div>

                <div className="text-sm tracking-wider mt-4 h-10">{cupcake.description}</div>
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
                        <input
                            type="number"
                            id="quantity"
                            min="1" max={"6"}
                            className="block py-2 px-4 appearance-none text-sm w-full bg-white border border-gray-400 hover:border-gray-500 
                            rounded leading-tight focus:outline-none focus:shadow-outline"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                </div>

                {/* result */}
                <div>
                    {/* <p className="text-sm ">Total Boxes: {quantity} {boxSize === 6 ? "(Regular)" : "(Large)"}</p>
                    <p className="text-sm mt-2">Total Quantity: {quantity*boxSize} pieces <span>{cupcake.weight}g each</span></p>
                     */}
                    <p className="mt-2  ">Total Price: <span className=' text-pink-500 font-semibold'>{(price * quantity).toFixed(2)}Tk</span></p>
                </div>
                {/* action */}
                <div className='w-full flex items-center justify-between gap-4 mt-4'>

                    <button className="w-full flex py-2 items-center justify-center gap-2 border-2 border-green-600 text-green-600 tracking-wide
                     hover:bg-gray-300 font-bold rounded">
                        <FaCartPlus /> Add
                    </button>
                    <button className="w-full border-0 py-2 bg-gray-100 text-green-600 tracking-wide hover:bg-gray-300 font-bold  rounded">
                        More
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Card;

