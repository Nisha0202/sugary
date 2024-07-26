import React, { useState, useEffect } from 'react';

const Card = ({cupcake}) => {
    const [quantity, setQuantity] = useState(6);
    const [price, setPrice] = useState(0);
  
    useEffect(() => {
      if (cupcake) {
        setPrice(cupcake.pricePerSix);
      }
    }, [cupcake]);
  
    const handleQuantityChange = (event) => {
      const value = parseInt(event.target.value);
      setQuantity(value);
      setPrice(value === 6 ? cupcake.pricePerSix : cupcake.pricePerTwelve);
    };

    if(!cupcake){
        return <div>no data</div>
    }

  return (

    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <img className="w-full h-48 object-cover" src={cupcake.image} alt={cupcake.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{cupcake.title}</div>
        <p className="text-gray-700 text-base">{cupcake.description}</p>
      </div>
      <div className="px-6 py-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Select Quantity:
          </label>
          <div className="relative">
            <select
              id="quantity"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              value={quantity}
              onChange={handleQuantityChange}
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
        <div>
          <p className="text-lg">Total Pieces: {quantity}</p>
          <p className="text-lg font-bold">Total Price: ${price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
