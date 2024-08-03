import React from 'react'
import {  FaInstagram, FaTwitter } from 'react-icons/fa6'
import { CgFacebook } from "react-icons/cg";
export default function Footer() {
  return (


      <footer className="bg-gray-200 h-52 flex justify-center items-center">
        <div className="container mx-auto p-4 flex flex-col gap-6">

          <div className='flex flex-col gap-4 lg:flex-row justify-between'>
            <div className='flex w-full'>
              <p className="text-wrap text-gray-600 mb-4 text-base/relaxed max-w-md text-center lg:text-start">Indulge in the sweetest cupcakes in town, baked fresh daily with the finest ingredients</p>

            </div>
            <div className=' flex justify-center items-center'>
              <ul className="flex  mb-4">
                <li className="mr-4">
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <CgFacebook size={24} className="text-gray-600 hover:text-gray-900" />
                  </a>
                </li>
                <li className="mr-4">
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={24} className="text-gray-600 hover:text-gray-900" />
                  </a>
                </li>
                <li className="mr-4">
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={24} className="text-gray-600 hover:text-gray-900" />
                  </a>
                </li>

              </ul>
            </div>
          </div>


          <div className="text-sm text-gray-600 text-center">&copy; 2024 Sugary. All rights reserved.</div>
        </div>
      </footer>


  )
}
