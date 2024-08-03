import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LuEye, LuEyeOff } from "react-icons/lu";
const ResetPassword = () => {
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://sugary-backend.vercel.app/api/reset-password', { token, newPassword: data.password });
            setSuccess(response.data.message);
            setLoading(false);
        } catch (error) {
            setMessage('Error resetting password');
            setLoading(false);
        }
    };

    // Toggle password visibility
    const handlePasswordToggle = () => {
        setShowPassword(prevState => !prevState);
      };
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)]">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-8 text-primary tracking-wider text-center">Enter New Password</h2>

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
                    className="w-full mb-6 py-3 px-4 bg-gray-100 text-pink-500 font-semibold rounded-md hover:bg-gray-300 transition-colors"
                >
                    Reset Password
                </button>
                {loading && <span className="loading loading-spinner font-bold text-success absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      flex items-center justify-center"></span>}
            </form>
            {success && <SuccessAlert message={success} />}
            {message && <p className="mt-4 text-red-500 font-bold text-center">{message}</p>}
        </div>
    );
};


export default ResetPassword;
