import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const Menu = () => {
    // const cupcake = {
    //     title: 'Delicious Cupcake',
    //     description: 'A deliciously sweet and moist cupcake, perfect for any occasion.',
    //     image: 'https://i.pinimg.com/564x/91/33/ea/9133ea1d7738ac492706a7bba1b2fa6a.jpg', // Replace with your image path
    //     pricePerSix: 15,
    //     pricePerTwelve: 28
    // };


    const [cupcakes, setCupcakes] = useState([]);

    useEffect(() => {
        fetch('cupcakes.json')
            .then(response => response.json())
            .then(data => setCupcakes(data));
    }, []);

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-auto ">
            <section>
                <h2 className="text-2xl w-full font-semibold text-center text-primary mt-6">Our Menu</h2>
            </section>
            <div className="flex flex-wrap gap-4 justify-center items-center h-auto my-4">
                {cupcakes.map((cupcake, index) => (
                    <Card key={index} cupcake={cupcake} />
                ))}
                {/* <Card cupcake={cupcake} /> */}
            </div>
        </div>

    );
};

export default Menu;
