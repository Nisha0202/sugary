// More.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
const More = ({ cupcakes }) => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const cupcake = cupcakes.find(cupcake => cupcake._id === id);
    const navigate = useNavigate();

    if (!cupcake) {
        return <div className=' min-h-[calc(100vh-208px)] w-full flex justify-center items-center' >No details not found!</div>;
    }

    if (error) {
        return <div className=' min-h-[calc(100vh-208px)] w-full flex justify-center items-center'>{error}</div>;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className="flex justify-center min-h-[calc(100vh-288px)] mx-auto p-4 mt-4 lg:mt-10 relative">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 right-0 border-2 mx-2 bg-gray-300 rounded-full p-2 hover:bg-gray-400"
                aria-label="Go back" title='Back'
            >
                <IoArrowBackCircleOutline className="h-6 w-6 font-bold" />
            </button>
            <div className="flex flex-wrap -mx-4 ">
                <div className="w-full lg:w-1/2 xl:w-1/3  max-h-80 lg:max-h-96 border-2 rounded">
                    <img
                    title={cupcake.title}
                        src={cupcake.image}
                        alt={cupcake.title}
                        className="w-full h-full object-cover object-center rounded"
                    />
                </div>
                <div className="w-full lg:w-1/2 xl:w-2/3 p-4 lg:pt-0 lg:ps-12 text-gray-800">
                    <h2 className="text-2xl lg:text-3xl tracking-wider font-bold mb-2">{cupcake.title}</h2>
                    <p className="text-gray-700 mb-6 w-full text-wrap">{cupcake.description}</p>
                    <div className='flex flex-col gap-4 w-full'>
                        <div className='flex justify-between max-w-sm items-center mr-4'>
                        <div >
                            <h2 className=' text-sm mb-2'>Weight</h2>
                            <p className=" mb-4 font-medium ">{cupcake.weight}g each</p>
                        </div> 
                         <div>
                            <h2 className='text-sm mb-2'>Category</h2>
                            <p className=" mb-4 font-medium ">{capitalizeFirstLetter(cupcake.category)}</p>
                        </div>
                        </div>
                        <div className='w-full'>
                            <h2 className='text-sm mb-2 w-full'>Ingredients</h2>
                            <p className=" mb-4 font-medium ">
                                {cupcake.ingredients.map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.slice(1)).join(', ')}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-xl font-bold my-2'>Why Choose Our Cupcakes?</h1>
                    <div className='flex mb-1 gap-2 items-center text-wrap '><GiCheckMark/><span className='text-gray-600'>Made with high-quality ingredients</span></div>
                    <div className='flex mb-1 gap-2 items-center text-wrap'><GiCheckMark/><span className='text-gray-600'>Baked fresh daily</span></div>
                    <div className='flex gap-2 items-center text-wrap'><GiCheckMark/><span className='text-gray-600'>Moist and flavorful</span></div>


                    
                    </div>
                   
                 
                </div>
            </div>
        </div>
    );
};


export default More;
