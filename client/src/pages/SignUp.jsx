import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LuEye, LuEyeOff } from "react-icons/lu";
import SuccessAlert from '../Alert/SuccessAlert';

export default function SignUp() {
  const [success, setSuccess] = useState(null);
  const [failor, setFailure] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [locationError, setLocationError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

   // const apiUrl = 'http://localhost:5000';
  const apiUrl = 'https://sugary-backend.vercel.app';

  // Toggle password visibility
  const handlePasswordToggle = () => {
    setShowPassword(prevState => !prevState);
  };


  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocoding with Nominatim
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
              params: {
                lat: latitude,
                lon: longitude,
                format: 'json',
                addressdetails: 1
              }
            });
            const address = response.data.display_name;
            setLocation(address); // Update the location state
            setValue('location', address); // Update the location value in the form state
            setLocationError(''); // Clear any previous errors
          } catch (error) {
            console.error('Error during reverse geocoding:', error);
            setLocationError('Unable to retrieve address.');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to retrieve location.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocationError('Geolocation is not supported by this browser.');
    }
  };


  // Handle form submission
  const onSubmit = async (data) => {
    console.log('Form submitted:', data);
    setLoading(true); // Set loading to true when form is submitted
    if(location){
       // Include location data in form submission
    data.location = location;
    }
   

    try {
      const response = await axios.post(`${apiUrl}/api/createuser`, data);
      console.log('Response:', response.data);
      // Check for the token in the response
      if (response.data.token) {
        // Set success message and reset form
        setSuccess('Please Verify Your Email and Login.');
        setFailure(null);
        reset();
      } else {
        setFailure('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        setFailure(error.response.data.error || 'User account already exists.');
      } else {
        setFailure('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (e) => {
    const userInput = e.target.value;
    if (userInput !== '') {
      setLocation(userInput); // Update the location state
    }
  };

  return (
    <div className='mt-3 min-h-[calc(100vh-208px)]'>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto px-2 py-6 rounded-md text-sm">
        <h2 className="text-xl mb-8 font-medium text-primary text-center">Welcome!</h2>

        <div className="relative mb-8">
          <input
            type="text"
            name="name"
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters long" }
            })}
            className="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent peer" placeholder=" " />
          <label htmlFor="name" className="absolute top-0 left-4 px-1 text-gray-500 bg-white transition-all transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-1/2 text-base rounded">Name</label>
          {errors.name && <p className="font-medium tracking-wide text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
        </div>

    <div className="relative mb-1 flex items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              name="location"
              id="location"
              onChange={handleLocationChange}
              // onChange={(e) => setLocation(e.target.value)} // Allow user to edit the value
              {...register("location", { required: "Location is required" })}
              className="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent peer"
              placeholder=" "
            />
            <label
              htmlFor="location"
              className="absolute top-0 left-4 px-1 text-gray-500 bg-white text-base transition-all transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-1/2"
            >
              Location
            </label>
          </div>
          <button
            type="button"
            onClick={handleGetLocation}
            className="rounded text-xs bg-gray-100 text-green-600 rounded-r-md hover:bg-gray-300 px-3 py-3.5 border-2"
          >
            My Location
          </button>
        </div> 
   
        <div className='mb-7 text-primary'>
          {!locationError && !errors.location && <div>We only deliver orders inside Dhaka city</div>}
          {locationError && <p className="font-medium tracking-wide text-red-500 text-xs mt-1.5">{locationError}</p>}
          {errors.location && <p className="font-medium tracking-wide text-red-500 text-xs mt-1.5">{errors.location.message}</p>}
        </div>
        <div className="relative mb-8">
          <input
            type="email"
            name="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email address is invalid"
              }
            })}
            className="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent peer" placeholder=" " />
          <label htmlFor="email" className="absolute top-0 left-4 px-1 text-gray-500 bg-white transition-all transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-1/2 text-base rounded">Email</label>
          {errors.email && <p className="font-medium tracking-wide text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
        </div>

        <div className="relative mb-8">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 5, message: "Password must be at least 5 characters long" }
            })}
            className="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent peer" placeholder=" " />
          <label htmlFor="password" className="text-base absolute top-0 left-4 px-1 text-gray-500 bg-white transition-all transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-1/2 rounded">Password</label>
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
          </button>
          {errors.password && <p className="font-medium tracking-wide text-red-500 text-xs mt-1.5">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full mb-6 py-3 px-4 bg-gray-100 text-green-600 font-semibold rounded-md hover:bg-gray-300 transition-colors"
        >
          Sign Up
        </button>

        <Link to={'/login'} className="text-sm flex flex-grow justify-end tracking-wide text-left">
          Already Signed Up?
          <span className='mx-2 text-end text-green-600 font-medium underline underline-offset-2'>Log In</span>
        </Link>
        {loading && <span className="loading loading-spinner font-bold text-success absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"></span>}
      </form>
      {success && <SuccessAlert className="bg-white" message={success} />}
      {failor && <p className="text-red-500 font-bold text-center">{failor}</p>}
    </div>
  );
}
