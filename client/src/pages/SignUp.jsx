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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Form submitted:', data);
    setLoading(true); // Set loading to true when form is submitted


    try {
      const response = await axios.post('http://localhost:5000/api/createuser', data);
      console.log('Response:', response.data);
      // Check for the token in the response
      if (response.data.token) {
        // Store the token in local storage
        localStorage.setItem('sugaryToken', response.data.token);

        // Set success message and reset form
        setSuccess('You are ready to order!');
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
      setLoading(false); // Set loading to false when request is complete
    }



  };

  return (
    <div className='mt-4 min-h-[calc(100vh-300px)]'>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto px-2 py-8 rounded-md">
        <h2 className="text-xl font-semibold mb-4 text-primary tracking-wider text-center">Sign Up</h2>

        <div className="mb-3">
          <label htmlFor="name" className="block text-sm text-text">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters long" }
            })}
            className="mt-1 p-2 block w-full border border-gray-300 focus:border-green-600 active:border-green-600 rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm text-text">Location</label>
          <div className='flex gap-2'>
            <input
              type="text"
              name="location"
              id="location"
              {...register("location", { required: "Location is required" })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            <button type="button" className='btn font-medium text-xs bg-gray-100 text-green-600 rounded-md hover:bg-gray-300'>Get <br /> Location</button>
          </div>
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-text">Email</label>
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
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-text">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 5, message: "Password must be at least 5 characters long" }
              })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-text"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <LuEye /> : <LuEyeOff />}
            </span>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full mt-2 mb-4 py-2.5 px-4 bg-gray-100 text-green-600 font-semibold rounded-md hover:bg-gray-300 transition-colors"
        >
          Sign Up
        </button>

        <Link to={'/login'} className="text-sm flex flex-grow justify-end tracking-wide text-left">
          Already Signed Up?
          <span className='mx-2 text-end text-green-600 font-medium underline underline-offset-2'>Log In</span>
        </Link>
         {loading && <span className="loading loading-spinner font-bold text-success absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      flex items-center justify-center"></span>}
      </form>
      {success && <SuccessAlert message={success} />}
      {failor && <p className="text-red-500 font-bold text-center">{failor}</p>}
     
    </div>
  );
}
