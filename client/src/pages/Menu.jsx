import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { FiSearch } from 'react-icons/fi';
import { FaSortAmountDown } from "react-icons/fa";
import { Fade, Slide } from "react-awesome-reveal";
const Menu = () => {
    const [cupcakes, setCupcakes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetch('cupcakes.json')
            .then(response => response.json())
            .then(data => setCupcakes(data));
    }, []);

    // Calculate the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cupcakes.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(cupcakes.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-auto ">
            <section className='w-full flex flex-col gap-6 items-center mb-6 mt-4 md:mt-6 '>
                <h2 className="text-2xl w-full max-w-xl font-semibold text-center text-primary ">Our Menu</h2>

             
                <div className='flex gap-4 max-w-xl w-full items-center'>
                       {/* search */}
                    <form className="max-w-xl w-full mx-auto">
                        <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <FiSearch className='text-xl text-text font-bold' />
                            </div>
                            <input type="search" id="default-search" className="focus:outline-none input rounded-md block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 
                         bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                          dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Happiness, One Cupcake at a Time..." required />
                        </div>
                    </form>

                    {/* sort */}
                    <div className="dropdown dropdown-left">
                        <div tabIndex={0} role="button" className="btn m-1 text-text"> <FaSortAmountDown/></div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Affordable</a></li>
                            <li><a>Vegan</a></li>
                            <li><a>Non-Vegan</a></li>
                           <li><a> Popular</a></li>
                        </ul>
                    </div>


                </div>

            </section>


            {/* menu */}
            <div className="flex flex-wrap gap-6 md:gap-10 justify-center items-center h-auto mb-4 mt-0 md:mt-4">
             
            <Slide triggerOnce>
                 {currentItems.map((cupcake, index) => (
                    <Card key={index} cupcake={cupcake} />
                ))}
                </Slide>
              
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menu;

