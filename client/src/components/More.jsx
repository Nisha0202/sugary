import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline} from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi"
const More = ({ cupcakes }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const cupcake = cupcakes.find(cupcake => cupcake._id === id);

  // Handle missing cupcake scenario with a more informative message
  if (!cupcake) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-lg">
        Cupcake not found. Please check the URL or try browsing our other delicious cupcakes.
      </div>
    );
  }

  return (
    <div className="cupcake-details flex flex-col items-center justify-center mb-4">
      <header className="flex justify-between w-full items-center py-2 px-4 mt-6">
        <div className='w-full lg:w-1/3 flex items-center'>
              <button
          className="back-button hover:bg-gray-200 focus:outline-none focus:ring-0 focus:ring-offset-2  rounded-full "
          onClick={() => navigate(-1)}
          aria-label="Go back"
          title="Back"
        >
          <IoArrowBackCircleOutline className="h-6 w-6 text-gray-700" />
        </button> 
        </div>
     
        <div className="text-2xl w-full text-end lg:text-start lg:w-2/3 font-bold text-gray-800 ">{cupcake.title}</div>
      </header>
      <main className="flex flex-col lg:flex-row justify-between gap-4 px-4 py-4"> 
        <section className="cupcake-image w-full flex justify-center items-center lg:w-1/3 mb-4  h-96">
          <img
            src={cupcake.image}
            alt={cupcake.title}
            className="rounded-md w-80 h-96  object-cover border-2"
          />
        </section>
        <section className="cupcake-info w-full lg:w-2/3">
          <p className="text-gray-700 mb-4 leading-loose max-w-xl text-wrap">{cupcake.description}</p>
          <div className="details-grid grid grid-cols-2 gap-4">
            <div className="detail">
              <h3 className="text-base font-medium text-gray-800">Weight</h3>
              <p className="text-sm text-gray-600">{cupcake.weight}g each</p>
            </div>
            <div className="detail">
              <h3 className="text-base font-medium text-gray-800">Category</h3>
              <p className="text-sm text-gray-600">{cupcake.category.charAt(0).toUpperCase() + cupcake.category.slice(1)}</p>
            </div>
            <div className="detail">
              <h3 className="text-base font-medium text-gray-800">Ingredients</h3>
              <p className="text-sm text-gray-600">{cupcake.ingredients.map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.slice(1)).join(', ')}</p>
            </div>
          </div>
          <div className="benefits mt-6">
            <h2 className="text-xl font-bold text-gray-800">Why Choose Our Cupcakes?</h2>
            <ul className="benefits-list list-none pl-1 mt-2">
              <li className="flex items-center text-gray-700 mb-1">
                <GiCheckMark className="text-green-500 mr-2" /> Made with high-quality ingredients
              </li>
              <li className="flex items-center text-gray-700 mb-1">
                <GiCheckMark className="text-green-500 mr-2" /> Baked fresh daily
              </li>
              <li className="flex items-center text-gray-700">
                <GiCheckMark className="text-green-500 mr-2" /> Moist and flavorful
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default More
