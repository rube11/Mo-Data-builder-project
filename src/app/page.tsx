
import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Link from 'next/link'

export default function Home() {
  return (
  <div className='min-h-screen flex flex-col'>
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
    </div>

    {/* activty feed section */}
    <div className='flex justify-center'>
      <div className='flex align-items-left mt-12 p-5 w-full lg:w-2/3'>
        <div>
          <p className='font-family-header text-accent text-5xl font-bold'>Recent <span className='text-secondary'>Acivity</span></p>

        </div>
      </div>
    </div>

    {/* Stats Section */}
    <div className='bg-secondary py-16 mt-16'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
          <div className='space-y-2'>
            <p className='text-5xl font-bold text-primary font-family-header'>2,000+</p>
            <p className='text-xl text-primary/90 font-family-body'>Reports Generated</p>
          </div>
          <div className='space-y-2'>
            <p className='text-5xl font-bold text-primary font-family-header'>300+</p>
            <p className='text-xl text-primary/90 font-family-body'>Satisfied Customers</p>
          </div>
          <div className='space-y-2'>
            <p className='text-5xl font-bold text-primary font-family-header'>99.9%</p>
            <p className='text-xl text-primary/90 font-family-body'>Accuracy Rate</p>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className='bg-accent text-primary py-12 mt-auto'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Company Info */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-bold font-family-header text-secondary'>MoData</h3>
            <p className='text-primary/80 font-family-body'>
              Transform your data into actionable insights with AI-powered analytics.
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold font-family-header'>Quick Links</h4>
            <ul className='space-y-2 font-family-body'>
              <li>
                <Link href='/' className='text-primary/80 hover:text-secondary transition-colors'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/generateData' className='text-primary/80 hover:text-secondary transition-colors'>
                  Generate Report
                </Link>
              </li>
              <li>
                <Link href='/ViewData' className='text-primary/80 hover:text-secondary transition-colors'>
                  View Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold font-family-header'>Contact</h4>
            <ul className='space-y-2 font-family-body text-primary/80'>
              <li>support@modata.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Data Street, Tech City</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-primary/20 mt-8 pt-8 text-center'>
          <p className='text-primary/60 font-family-body'>
            © 2025 MoData. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>



  );
}
