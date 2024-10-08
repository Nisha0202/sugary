
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FeaturedRecipesCarousel.css'; // Import your CSS file for styling
import { NavLink, Link } from 'react-router-dom'


const FeaturedRecipesCarousel = () => {

  const [cupcakes, setCupcakes] = useState([]);

  useEffect(() => {
    fetch('cupcakes.json')
      .then(response => response.json())
      .then(data => setCupcakes(data));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 3 cupcakes per slide
    slidesToScroll: 1,
    swipeToSlide: true, // Enables swipe to slide
    autoplay: true,
    autoplaySpeed: 2000,
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
    <div className='max-w-[1160px] mx-auto mt-8 lg:mt-12 mb-12 lg:mb-24 overflow-hidden'>
      <Slider {...settings}>
        {cupcakes.slice(0, 5).map((cupcake, index) => (
          <div key={index} className='border-0 outline-none'>
            <Link
              to="/menu"
              className="relative carousel-image block cursor-pointer rounded-md border-2 overflow-hidden group"
              style={{
                backgroundImage: `url(${cupcake.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              
              <div className="hidden group-hover:flex absolute inset-0 carousel-image hover:bg-black 
              hover:bg-opacity-40 items-center justify-center h-full z-10">
                <span className="btn border-2  bg-gray-100 btn-sm text-sm rounded-md btn-bordered">
                    View Menu
                </span>
            </div>
            </Link>


            <div className="carousel-content grid place-content-center">
              <h3 className='font-bold text-lg text-text'>{cupcake.title}</h3>
              <p className='text-wrap min-w-80 px-4'>{cupcake.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedRecipesCarousel;