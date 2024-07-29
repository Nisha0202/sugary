import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LuEye, LuEyeOff } from "react-icons/lu";
import SuccessAlert from '../Alert/SuccessAlert';

export default function LogIn() {
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
      const response = await axios.post('http://localhost:5000/api/loginuser', data);
      console.log('Response:', response.data);
      setSuccess('Welcome! You are Ready to Order!');
      setFailure(null);
      reset();
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        setFailure(error.response.data.error || 'Wrong Credentials');
      } else {
        setFailure('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading to false when request is complete
    }



  };

  return (
    <div className='mt-4 min-h-[calc(100vh-300px)]'>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto px-2 py-14 rounded-md ">
        <h2 className="text-xl font-semibold mb-4 text-primary tracking-wider text-center">Log In</h2>
            
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-text">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
          Log In
        </button>
       
        <Link to={'/signup'} className="text-sm flex flex-grow  justify-end tracking-wide text-left">New Here?
           <span className='mx-2 text-end text-green-600 font-medium underline underline-offset-2'>Sign Up</span>
        
        </Link>
      </form>
      {success && <SuccessAlert message={success} />}
      {failor && <p className="text-red-500 font-bold text-center">{failor}</p>}
      {loading && <span className="loading loading-spinner font-bold text-success"></span>}
    </div>
  );
}

