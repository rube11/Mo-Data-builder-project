'use client';
import Link from 'next/link'
import React, { useState } from 'react';

interface NavbarProps {
  activePage ? : 'home' | 'view' | 'contact';
}

const Navbar: React.FC<NavbarProps> = ({ activePage}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getLinkClass = (page: string) => {
    const baseClass = 'group font-family-body transition-colors duration-300';
    return page === activePage 
      ? `${baseClass} text-secondary` 
      : `${baseClass} hover:text-secondary`;
  };

  return (
    <nav className='bg-primary shadow-lg rounded-full m-8 w-full lg:w-3/4 w-2/3-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-12'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <h1 className='text-2xl font-bold'>Mo-Data</h1>
          </div>

          {/* Nav Links - Desktop */}
          <div className='hidden md:flex space-x-8'>
            <Link href='/' className={getLinkClass('home')}>
              <span className={`mr-2 transition-opacity duration-300 ${activePage === 'home' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                →
              </span>
              <span>Home</span>
            </Link>
            <Link href='/ViewData' className={getLinkClass('view')}>
              <span className={`mr-2 transition-opacity duration-300 ${activePage === 'view' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                →
              </span>
              <span>View Data</span>
            </Link>
            <a href='#contact' className={getLinkClass('contact')}>
              <span className={`mr-2 transition-opacity duration-300 ${activePage === 'contact' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                →
              </span>
              <span>Contact</span>
            </a>
          </div>

          {/* Create Button - Desktop */}
          <div className='hidden md:block'>
            <button className='bg-secondary text-white font-family-body px-4 py-2 rounded-full hover:bg-blue-700 whitespace-nowrap flex-shrink-0 min-w-max'>
              Create Report {'>'}
            </button>
          </div>

          {/* Hamburger Menu Button */}
          <div className='flex justify-center md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='hover:text-secondary focus:outline-none'
            >
              <svg className='h-6 w-6' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' stroke='currentColor'>
                {isOpen ? <path d='M6 18L18 6M6 6l12 12' /> : <path d='M4 6h16M4 12h16M4 18h16' />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='flex justify-center'>
          <div className='md:hidden bg-primary rounded-b-3xl px-4 pb-4'>
            <div className='flex flex-col space-y-4'>
              <a href='#home' className={getLinkClass('home')} onClick={() => setIsOpen(false)}>
                <span className={`mr-2 ${activePage === 'home' ? 'opacity-100' : ''}`}>→</span>
                <span>Home</span>
              </a>
              <a href='#view' className={getLinkClass('view')} onClick={() => setIsOpen(false)}>
                <span className={`mr-2 ${activePage === 'view' ? 'opacity-100' : ''}`}>→</span>
                <span>About</span>
              </a>
              <a href='#contact' className={getLinkClass('contact')} onClick={() => setIsOpen(false)}>
                <span className={`mr-2 ${activePage === 'contact' ? 'opacity-100' : ''}`}>→</span>
                <span>Contact</span>
              </a>
              <button className='bg-secondary text-white font-family-body px-4 py-2 rounded-full hover:bg-blue-700 w-full'>
                Create Report {'>'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;