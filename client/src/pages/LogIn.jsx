import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LuEye, LuEyeOff } from "react-icons/lu";
import SuccessAlert from '../Alert/SuccessAlert';
import { jwtDecode } from "jwt-decode";

export default function LogIn() {
  const [success, setSuccess] = useState(null);
  const [failor, setFailure] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const apiUrl = 'http://localhost:5000';

  const onSubmit = async (data) => {
    console.log('Form submitted:', data);
    setLoading(true); // Set loading to true when form is submitted


    try {
      const response = await axios.post(`${apiUrl}/api/loginuser`, data);
      console.log('Response:', response.data);

      // Check htmlFor the token in the response
      if (response.data.token) {
        // Store the token in local storage
        localStorage.setItem('sugaryToken', response.data.token);
        const token = localStorage.getItem('sugaryToken');
        const decoded = jwtDecode(token);
        if (token && decoded.isAdmin) {
          setSuccess('Welcome! Admin!');
          setFailure(null);
          reset();
          setTimeout(() => {
            // Your code here
            console.log('Executed after 2 seconds');
            navigate('/');
            location.reload();
          }, 2000);
  
        } else if (token) {
          // Set success message and reset form
          setSuccess('Welcome! You are Ready to Order!');
          setFailure(null);
          reset();
          setTimeout(() => {
            // Your code here
            console.log('Executed after 2 seconds');
            navigate('/');
            location.reload();
          }, 2000);
  
        }

      } else {
        setFailure('An unexpected error occurred. Please try again.');
      }

    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        setFailure(error.response.data.error || 'Wrong Credentials!');
      } else if (error.response && error.response.status === 403) {
        setFailure(error.response.data.error || 'User not verified!');
      }
      else {
        setFailure('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading to false when request is complete
    }

  };

  // Toggle password visibility
  const handlePasswordToggle = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className='mt-4 min-h-[calc(100vh-268px)]'>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto px-2 py-14 rounded-md text-sm">
        <h2 className="text-xl font-semibold mb-8 text-primary tracking-wider text-center">Welcome back!</h2>

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
          <label htmlFor="name" className="absolute top-0 left-4 px-1 text-gray-500 bg-white transition-all transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
          peer-focus:scale-75 peer-focus:-translate-y-1/2 text-base">Email</label>
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
            className="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded 
            focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent peer" placeholder=" " />
          <label htmlFor="name" className="absolute top-0 left-4 px-1 text-gray-500 bg-white transition-all transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:scale-100 
          peer-placeholder-shown:-translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-1/2 text-base">Password</label>
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
          Log In
        </button>
        <div className='flex justify-between items-center'>
          <Link to={'/forgot-password'} className="text-sm ">Frogot Password?
            <span className="mx-2 text-start text-primary underline underline-offset-2">Here</span>

          </Link>
          <Link to={'/signup'} className="text-sm tracking-wide text-left">New Here?
            <span className='mx-2 text-end text-green-600 font-medium underline underline-offset-2'>Sign Up</span>

          </Link>

        </div>

        {loading && <span className="loading loading-spinner font-bold text-success absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      flex items-center justify-center"></span>}
      </form>
      {success && <SuccessAlert message={success} />}
      {failor && <p className="text-red-500 font-bold text-center">{failor}</p>}

    </div>
  );
}

