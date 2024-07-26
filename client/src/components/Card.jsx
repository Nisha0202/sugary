import React, { useState, useEffect } from 'react';

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
            <img className="w-full h-52 rounded-md object-cover border-2 " src={cupcake.image} alt={cupcake.title} />
            <div className="py-4">
                <div className="font-semibold tracking-wide text-text2 text-xl h-8">{cupcake.title}</div>
                <div className="text-sm tracking-wider mt-4 h-16">{cupcake.description}</div>
            </div>
            <div className="">
                {/* selection */}
                <div className='flex justify-between items-center w-full gap-6 font-medium'>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm  mb-2" htmlFor="boxSize">
                            Select Box Size:
                        </label>
                        <div className="relative">
                            <select
                                id="boxSize"
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                value={boxSize}
                                onChange={handleBoxSizeChange}
                            >
                                <option value={6}>6 pieces</option>
                                <option value={12}>12 pieces</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M7 10l5 5 5-5H7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm  mb-2" htmlFor="quantity">
                            Select Quantity:
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            min="1" max={"6"}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                </div>


                {/* result */}
                <div>
                    <p className="text-sm ">Total Boxes: {quantity}</p>
                    <p className="mt-2  ">Total Price: <span className=' text-secondary font-semibold'>{(price * quantity).toFixed(2)}Tk</span></p>
                </div>
                {/* action */}
                <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Card;

