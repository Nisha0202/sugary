import React from 'react'
import Hero from '../components/Hero'
import FeaturedRecipesCarousel from '../components/FeaturedRecipesCarousel'

export default function Home() {
  return (
    <div>
      <Hero/>

      <section className='mt-12 lg:mt-20'>
                <h2 className="text-2xl w-full font-semibold text-center text-primary">Featured Cupcakes</h2>
            </section>
      <FeaturedRecipesCarousel/>



    </div>
  )
}
