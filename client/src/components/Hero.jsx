import React from 'react'
import { FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';
export default function Hero() {
    return (
        <>
            <section className="relative w-full h-[380px] mt-6">
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                    src="https://videos.pexels.com/video-files/7525343/7525343-hd_1920_1080_25fps.mp4"
                />

                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-55 rounded-md" />

                {/* Content */}
                <div className="relative w-full h-full flex  items-center justify-center text-center text-white">
                    <div>
                        <h1 className="text-4xl font-bold drop-shadow-2xl">Welcome to Sugary</h1>
                        <p className="mt-4 mb-6 drop-shadow-2xl max-w-xl px-4  tracking-wide">Creating beautifully decorated, 
                            mouth-watering cupcakes that are perfect for any occasion
                </p>
                    
                     {/* search */}
                     <div className='max-w-lg mx-4'>
                          <label className="input input-bordered flex items-center  gap-2 text-black rounded-md ">
                            <input type="text" className="grow" placeholder="Happiness, One Cupcake at a Time..." />
                            <FiSearch className='text-xl text-gray-500 font-bold'/>
                        </label>
                     </div>
                      
                    </div>
                </div>
            </section>


        </>
    )
}
