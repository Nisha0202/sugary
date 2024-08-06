import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { FiSearch } from 'react-icons/fi';
import { FaSortAmountDown } from "react-icons/fa";
import { Slide } from "react-awesome-reveal";

const Menu = () => {
    const [cupcakes, setCupcakes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState(''); // Add filter state
    const itemsPerPage = 6;
    const apiUrl = 'https://sugary-backend.vercel.app';

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${apiUrl}/api/get-items`);
                const data = await response.json();
                setCupcakes(data);
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        };
        fetchData();
    }, [filter, currentPage]);

    // Filter and search logic
    const filteredCupcakes = cupcakes.filter(cupcake => {
        const matchesSearch = (cupcake.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cupcake.description.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesFilter = filter === 'affordable'
            ? true
            : filter
                ? cupcake.category.toLowerCase() === filter.toLowerCase()
                : true;

        return matchesSearch && matchesFilter;
    });

    // Sorting logic for affordable filter
    const sortedCupcakes = filter === 'affordable'
        ? filteredCupcakes.sort((a, b) => a.pricePerSix - b.pricePerSix)
        : filteredCupcakes;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedCupcakes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedCupcakes.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Function to handle filter change and reset to the first page
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
    };
    return (
        <div className="flex flex-col gap-4 justify-center items-center min-h-[calc(100vh-268px)]">
            <section className='w-full flex flex-col gap-6 items-center mb-6 mt-4 md:mt-6'>
                <h2 className="text-2xl w-full max-w-xl font-semibold text-center text-primary">Our Menu</h2>
                <div className='flex lg:gap-4 gap-1 max-w-xl w-full items-center'>
                    {/* search */}
                    <form className="max-w-xl w-full mx-auto bg-white">
                        <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only ">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <FiSearch className='text-xl text-text font-bold' />
                            </div>
                            <input
                                title='Seach here'
                                type="search"
                                id="default-search"
                                className="focus:outline-none input rounded-md block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300
                                bg-gray-50 focus:ring-green-500 focus:border-green-500 "
                                placeholder="Happiness, One Cupcake at a Time..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                required
                            />
                        </div>
                    </form>

                    {/* sort */}
                    <div className="dropdown dropdown-left bg-white">
                        <summary tabIndex={0}  className="btn m-1 text-text bg-gray-200">
                            <FaSortAmountDown />
                        </summary>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a onClick={() => handleFilterChange('affordable')}>Affordable</a></li>
                            <li><a onClick={() => handleFilterChange('vegan')}>Vegan</a></li>
                            <li><a onClick={() => handleFilterChange('non-vegan')}>Non-Vegan</a></li>
                            <li><a onClick={() => handleFilterChange('')}>All</a></li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Display no results message */}
            {!isLoading && sortedCupcakes.length === 0 && (
                <div className="text-gray-600 text-lg">No cupcakes to show.</div>
            )}


            {/* menu */}
            <div className="flex flex-wrap gap-6 md:gap-10 justify-center items-center min-h-[calc(100vh-200px)] h-auto mb-4 mt-0 md:mt-4">
                {isLoading ? (
                    <div className="loading-indicator fixed top-0 left-0 right-0 bottom-0 z-20 flex items-center justify-center">Loading Menu...</div>
                ) : (
                    <Slide triggerOnce>
                        {currentItems.map((cupcake, index) => (
                            <Card key={index} cupcake={cupcake} />
                        ))}
                    </Slide>
                )}
            </div>

            <div className="pagination mb-16 lg:mt-4 mt-3">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`py-2 px-3 rounded-md text-xs font-semibold mx-1 ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menu;
