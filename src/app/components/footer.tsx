import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-accent text-primary py-8 w-full md:fixed md:bottom-0 md:left-0 md:right-0 z-10'>
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
  );
};

export default Footer;
