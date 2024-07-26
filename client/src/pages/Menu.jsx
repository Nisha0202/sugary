import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { FiSearch } from 'react-icons/fi';

const Menu = () => {
    const [cupcakes, setCupcakes] = useState([]);

    useEffect(() => {
        fetch('cupcakes.json')
            .then(response => response.json())
            .then(data => setCupcakes(data));
    }, []);

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-auto ">
            <section className='w-full flex flex-col gap-4 items-center my-6'>
                <h2 className="text-2xl w-full max-w-xl font-semibold text-center text-primary ">Our Menu</h2>

                {/* <div className='max-w-xl w-full'>
                          <label className="hover:ring-0 focus:outline-none active:outline-none focus:ring-0 border-gray-400 active:ring-0 input input-bordered 
                          flex items-center gap-2 rounded-md py-2">
                            <input type="text" className="grow w-full focus:ring-0 hover:ring-0 border-gray-400 active:ring-0" placeholder="Happiness, One Cupcake at a Time..." />
                            <FiSearch className='text-xl text-gray-500 font-bold'/>
                        </label>
                     </div> */}
                {/* search */}
                <form className="max-w-xl w-full mx-auto">
                    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <FiSearch className='text-xl text-gray-500 font-bold' />
                        </div>
                        <input type="search" id="default-search" className="focus:outline-none input rounded-md block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 
                         bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                          dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Happiness, One Cupcake at a Time..." required />
                    </div>
                </form>

            </section>
            <div className="flex flex-wrap gap-6 md:gap-8 justify-center items-center h-auto my-4">
                {cupcakes.map((cupcake, index) => (
                    <Card key={index} cupcake={cupcake} />
                ))}
                {/* <Card cupcake={cupcake} /> */}
            </div>
        </div>

    );
};

export default Menu;
