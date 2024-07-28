import React from 'react'

import { PiCalendarDuotone } from "react-icons/pi";
import { BsClockHistory } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
const Services = () => {
  return (
    <section id="services" className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Our Cupcake Services</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80">
            <PiCalendarDuotone className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-xl font-semibold mb-2">Advance Ordering</h3>
            <p className="text-gray-700">Place your order at least 1 day in advance to ensure freshness and availability.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80">
            <BsClockHistory className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-xl font-semibold mb-2">Flexible Delivery Time</h3>
            <p className="text-gray-700">Choose your preferred delivery date and time to match your occasion.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80">
            <SlLocationPin className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-xl font-semibold mb-2">Delivery in Dhaka</h3>
            <p className="text-gray-700">We deliver to any location within Dhaka. Enjoy our cupcakes at your desired place!</p>
          </div>
        </div>
    
      </div>
    </section>
  );
}

export default Services;
