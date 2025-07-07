'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavbarHero() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className='relative'>
      {/* Navbar */}
      <nav className='fixed top-0 left-0 w-full bg-white shadow-sm z-50'>
        <div className='px-6 md:px-2 lg:px-4px xl:px-20 mx-auto flex items-center justify-between py-0'>
          {/* Logo */}
          <Link href='/' className='flex items-center text-black'>
            <div className='flex items-center justify-center w-40 h-18 md:w-40 md:h-20 lg:w-44 lg:h-20 overflow-hidden'>
              <Image
                src='/assets/img/logo.jpg'
                alt='Koti Resorts'
                width={1000}
                height={1000}
                className='cursor-pointer'
              />
            </div>
          </Link>
          <div className='flex items-center md:gap-1 lg:gap-6 flex-nowrap'>
            {/* Desktop Nav Links */}
            <ul className='hidden md:flex space-x-2 lg:space-x-6 md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] text-gray-700 font-medium whitespace-nowrap'>
              {[
                { name: 'Home', url: '/' },
                { name: 'Accommodation', url: '/accomodation' },
                { name: 'Dining', url: '/dining' },
                { name: 'Weddings & Events', url: '/events/weddings' },
                { name: 'Corporate Events', url: '/plan-your-event' },
                { name: 'Explore', url: '/activitie' },
                { name: 'Offers', url: '/offers' },
                { name: 'Contact Us', url: '/contact-us' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className={`uppercase font-semibold transition duration-300 ${
                      pathname === link.url
                        ? 'text-yellow-700 border-t-8 py-[26px]'
                        : 'hover:text-yellow-700 hover:border-t-8 hover:py-[26px]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Book Now Button */}
            <a
              target='_blank'
              href='https://live.ipms247.com/booking/book-rooms-927877'
              className='hidden md:block text-xs font-light bg-[#553f26] text-white md:px-0 lg:px-8 md:py-2 lg:py-3 hover:bg-yellow-800 transition md:min-w-[100px] lg:min-w-[140px] text-center'
            >
              BOOK NOW !
            </a>
          </div>

          {/* Weather Display */}

          {/* Mobile Menu Toggle */}
          <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className='w-7 h-7 text-red-500 font-bold' />
            ) : (
              <img src='/assets/menu.svg' className='w-6 h-6' />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className='absolute top-16 left-0 w-full bg-white shadow-md md:hidden'>
            <ul className='space-y-1 pt-2 w-full'>
              {[
                { name: 'About Us', url: '/about-us' },
                { name: 'Accommodation', url: '/accomodation' },
                { name: 'Weddings & Events', url: '/events/weddings' },
                { name: 'Corporate Events', url: '/plan-your-event' },
                { name: 'Explore', url: '/activitie' },
                { name: 'Offers', url: '/offers' },
                { name: 'Gallery', url: '/gallery' },
                { name: 'Contact Us', url: '/contact-us' },
                { name: 'Testimonials', url: '/testimonials' },
                { name: 'Resort Policies', url: '/resort-policies' },
                { name: 'Privacy Policies', url: '/privacy-policy' },
              ].map((link, index) => (
                <li key={index} className='w-full'>
                  <Link
                    href={link.url}
                    className={`block w-full px-6 py-3 text-gray-700 transition duration-300 ${
                      pathname === link.url
                        ? 'text-white bg-green-900 font-normal'
                        : 'hover:text-yellow-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
    </header>
  );
}
