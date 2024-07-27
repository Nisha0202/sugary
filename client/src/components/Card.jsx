import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

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

    if (!cupcake) {
        return <div className='grid place-items-center my-4 text-xl font-semibold'>No menu item to show!</div>
    }

    return (
        <div className="w-72 rounded-md flex justify-center items-center text-center flex-col border-2 overflow-hidden p-4 bg-white">
            <img className="w-64 h-52 rounded-md object-cover border-2
             transform transition-transform duration-300 hover:scale-105 " src={cupcake.image} alt={cupcake.title} />
          
            <div className="py-4">
                <div className='w-full justify-between flex items-center h-6 px-2'>
                    <div className="font-medium tracking-wide text-xl ">{cupcake.title}</div>
                    <div className='text-sm'>{cupcake.weight}g each</div>
                </div>

                <div className="text-sm tracking-wider mt-4 h-14">{cupcake.description}</div>
            </div>
            <div className="px-2 w-full">
                {/* selection */}
                <div className='flex w-full justify-between items-center gap-8 font-medium '>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm  mb-2" htmlFor="boxSize">
                            Box Size:
                        </label>
                        <div className="relative">
                            <select
                                id="boxSize"
                                className="block p-2 min-w-24 text-sm appearance-none bg-white border border-gray-400 hover:border-gray-500
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm  mb-2" htmlFor="quantity">
                            Quantity of Box:
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            min="1" max={"6"}
                            className="block p-2 appearance-none text-sm w-24 bg-white border border-gray-400 hover:border-gray-500 
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
                <button className="mt-4 w-full border-2 border-green-600 text-green-600 tracking-wide hover:bg-gray-100 font-bold py-2 px-4 rounded">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Card;

