import React from 'react';
import Card from '../components/Card';

const Menu = () => {
  const cupcake = {
    title: 'Delicious Cupcake',
    description: 'A deliciously sweet and moist cupcake, perfect for any occasion.',
    image: 'https://i.pinimg.com/564x/91/33/ea/9133ea1d7738ac492706a7bba1b2fa6a.jpg', // Replace with your image path
    pricePerSix: 15,
    pricePerTwelve: 28
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card cupcake={cupcake} />
    </div>
  );
};

export default Menu;
