/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FeaturedRecipesCarousel.css'; // Import your CSS file for styling
import Link from 'next/link';


const FeaturedRecipesCarousel = () => {

const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('recipes.json')
     .then(response => response.json())
     .then(data => setRecipes(data));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 3 recipes per slide
    slidesToScroll: 1,
    swipeToSlide: true, // Enables swipe to slide
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      }
    ]
  };

  return (
    <div className='max-w-[1200px] mx-auto mt-8 lg:mt-12 mb-16 lg:mb-24'>
      <Slider {...settings}>
        {recipes.map(recipe => (
          <div key={recipe._id} className='border-0 outline-none'>
            <Link href={`/recipes/${recipe._id}`} legacyBehavior>
                <img
                  className="carousel-image cursor-pointer rounded-md border-2 outline-none hover:opacity-70"
                  src={recipe.imageUrl}
                  alt={recipe.title}
                />
    
            </Link>
            <div className="carousel-content grid place-content-center">
              <h3 className='font-bold text-lg text-text'>{recipe.title}</h3>
              <p className='text-wrap min-w-80 px-4'>{recipe.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedRecipesCarousel;