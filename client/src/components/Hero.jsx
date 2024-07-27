import React from 'react'
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
                        <p className="mt-4 mb-6 drop-shadow-2xl max-w-xl px-4 tracking-wide">Creating beautifully decorated, 
                            mouth-watering cupcakes that are perfect for any occasion
                             </p>
                            <button className=' font-medium rounded-md bg-gray-200 text-green-600 px-4 py-2
                            transform transition-transform duration-300 hover:scale-105 '>
                            Treat Yourself Today!
                            </button>
                           
                    </div>
                </div>
            </section>


        </>
    )
}
