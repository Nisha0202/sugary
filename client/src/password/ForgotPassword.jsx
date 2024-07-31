import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import SuccessAlert from '../Alert/SuccessAlert';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/forgot-password', { email: data.email });
            setSuccess(response.data.message);
setLoading(false);

        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessage(error.response.data.error || 'User account not exists!');
              } else if(error.response && error.response.status === 403) {
                setMessage(error.response.data.error || 'User is not Verified!');
              } else {
                setMessage('An unexpected error occurred. Please try again.');
              }
              setLoading(false);
            
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-4 min-h-[calc(100vh-300px)] ">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-8 text-primary tracking-wider text-center">Enter Email</h2>

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
                <button
                    type="submit"
                    className="w-full mb-6 py-3 px-4 bg-gray-100 text-pink-500 font-semibold rounded-md hover:bg-gray-300 transition-colors"
                >
                    Request Password Reset
                </button>
                {loading && <span className="loading loading-spinner font-bold text-success absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      flex items-center justify-center"></span>}
            </form>
            {success && <SuccessAlert message={success} />}
            {message && <p className="mt-4 text-red-500 font-bold text-center">{message}</p>}
        </div>
    );
};

export default ForgotPassword;
