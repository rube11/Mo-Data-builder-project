
import React from 'react';
import Navbar from './components/navbar';
import Link from 'next/link'

export default function Home() {
  return (
  <div>
    <div>
      <Navbar activePage='home'/>
    </div>
    {/* landing page text */}
    <div className='flex justify-center m-12'>
      <div className='flex flex-col w-full lg:w-1/2 space-y-4 '>
        <span className='text-secondary font-bold text-5xl font-family-header'>
          AI Data Solutions
        </span>
        <span className= 'text-accent font-bold text-5xl font-family-header'>
          Gain an Edge With Generated Data Reports and Visuals
        </span>
        <p className='text-accent font-medium text-2xl font-family-body'>
          Every business deserves clarity from their data. 
          MoData instantly turns raw inputs into actionable insights.
        </p>
        {/* try it out button */}
        <div className='flex justify-center'>
          <Link href='/generateData' className='bg-secondary text-primary font-family-body font-semibold px-12 py-2 rounded-full transition-all 
            duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-secondary/50 active:scale-95'> 
            Try it Out
          </Link> 
        </div>
      </div>

      {/* activty feed section */}

    </div>
  </div>



  );
}
