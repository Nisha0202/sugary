// More.jsx
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

const More = ({ cupcakes }) => {
    const { id } = useParams();

    const cupcake = cupcakes.find(cupcake => cupcake._id === id);

    if (!cupcake) {
        return <div>Cupcake not found!</div>;
    }

    return (
        <div>
            <h1>{cupcake.title}</h1>
            <img src={cupcake.image} alt={cupcake.title} />
            <p>{cupcake.description}</p>
            <p>Weight: {cupcake.weight}g</p>
            <p>Price (6 pieces): {cupcake.pricePerSix} Tk</p>
            <p>Price (12 pieces): {cupcake.pricePerTwelve} Tk</p>
            <p>Category: {cupcake.category}</p>
            <p>Ingredients: {cupcake.ingredients.join(', ')}</p>
        </div>
    );
};

export default More;
