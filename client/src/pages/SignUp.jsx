import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Add your form submission logic here (e.g., API call)
    console.log('Form submitted:', data);
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
            {...register("name", { required: "Name is required" })}
            className="mt-1 p-2 block w-full border border-gray-300 focus:border-green-600
            active:border-green-600  rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
          <button className='btn font-medium text-xs 
           bg-gray-100 text-green-600  rounded-md hover:bg-gray-300'>Get <br/> Location</button>
          </div>
       
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        
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
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full mt-2 mb-4 py-2.5 px-4 bg-gray-100 text-green-600 font-semibold rounded-md hover:bg-gray-300 transition-colors"
        >
          Sign Up
        </button>
       
        <Link to={'/login'} className="text-sm flex flex-grow  justify-end tracking-wide text-left">Already Signed Up?
           <span className='mx-2 text-end text-green-600 font-medium underline underline-offset-2'>Log In</span>
        
        </Link>
      </form>
    </div>
  );
}

