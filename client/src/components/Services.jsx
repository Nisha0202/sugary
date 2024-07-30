import React from 'react'
import { BsCalendar2Date } from "react-icons/bs";
import { LuClock8 } from "react-icons/lu";
import { ImLocation } from "react-icons/im";
const Services = () => {

  return (
    <section id="services" className="mt-12 lg:mt-20">
      <div className="container mx-auto text-center">
      <h2 className="text-2xl w-full font-semibold text-center text-primary mb-12">Our Cupcake Services</h2>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
          <div className="p-6 rounded-md  border-2 w-72 transition-all duration-300 ease-in-out hover:bg-gray-100">
            <BsCalendar2Date  className="mx-auto mb-4 mt-1 text-2xl text-green-600" />
            <h3 className="text-lg font-medium mb-2 text-text">Advance Ordering</h3>
            <p className=" text-sm/relaxed  text-wrap tracking-wide">Order at least 1 day in advance to ensure freshness and availability.</p>
          </div>
          <div className="p-4 rounded-md border-2 w-72 transition-all duration-300 ease-in-out hover:bg-gray-100">
            <LuClock8 className="mx-auto mb-4 mt-2 text-2xl text-green-600 font-bold" />
            <h3 className="text-lg font-medium mb-2 text-text">Flexible Delivery Time</h3>
            <p className="text-sm/relaxed text-wrap tracking-wide">Choose your preferred delivery date and time to match your occasion.</p>
          </div>
          <div className="p-4 rounded-md border-2 w-72 transition-all duration-300 ease-in-out hover:bg-gray-100">
            <ImLocation className="mx-auto mb-4 mt-2 text-2xl text-green-600 font-semibold" />
            <h3 className="text-lg font-medium mb-2 text-text">Delivery in Dhaka</h3>
            <p className="text-sm/relaxed text-wrap tracking-wide">We deliver to any desired location within Dhaka city.</p>
          </div>
        </div>
    
      </div>
    </section>
  );
}

export default Services;
