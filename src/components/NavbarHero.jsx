'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import { AlignJustify, AlignRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavbarHero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu (left)
  const pathname = usePathname();

  // Function to generate check-in and check-out dates
  const getBookingDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    // Format dates as YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      checkInDate: formatDate(tomorrow),
      checkOutDate: formatDate(dayAfterTomorrow),
    };
  };

  const { checkInDate, checkOutDate } = getBookingDates();

  // Construct the booking URL with dynamic dates
  const bookingUrl = `https://www.radissonhotels.com/en-us/booking/room-display?hotelCode=INPBHOSAAA&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults%5B%5D=2&children%5B%5D=0&aoc%5B%5D=&searchType=lowest&promotionCode=&voucher=&brands=&brandFirst=`;

  // Navigation links
  const navLinks = [
    { name: 'Home', url: '/' },
    { name: 'Accommodation', url: '/accomodation' },
    { name: 'Dining', url: '/dining' },
    { name: 'Weddings & Events', url: '/events/weddings' },
    { name: 'Corporate Events', url: '/plan-your-event' },
    { name: 'Explore', url: '/activitie' },
    { name: 'Offers', url: '/offers' },
    { name: 'Contact Us', url: '/contact-us' },
  ];

  return (
    <header className='relative'>
      {/* Navbar */}
      <nav className='fixed top-0 left-0 w-full bg-black/30 shadow-sm z-50 backdrop-blur-xs'>
        <div className='px-2 md:px-2 lg:px-4 xl:px-16 mx-auto flex items-center justify-between md:py-1'>
          {/* Mobile Layout: Logo on Left, Menu Toggle on Right */}
          <div className='flex items-center justify-between w-full md:w-auto'>
            <Link href='/' className='flex items-center text-black lg:hidden'>
              <div className='flex items-center justify-center w-40 h-18 md:w-30 md:h-15 overflow-hidden'>
                <Image
                  src='/assets/img/footer.png'
                  alt='Gaj Retreats'
                  width={1200}
                  height={1000}
                  className='cursor-pointer'
                />
              </div>
            </Link>
            {/* Mobile Menu Toggle */}
            <button
              className='md:hidden text-gray-100'
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <AlignRight />
            </button>
          </div>

          {/* Desktop Layout: Centered Logo and Right-Side Menu Toggle */}
          <div className='hidden lg:flex items-center w-full'>
            <div className='flex-1 flex justify-between items-center gap-6'>
              <div className='flex justify-center items-center'>
                <Link href='/' className='flex items-center text-black'>
                  <div className='w-44 h-20 overflow-hidden'>
                    <Image
                      src='/assets/img/footer.png'
                      alt='Gaj Retreats'
                      width={1200}
                      height={1000}
                      className='object-contain cursor-pointer'
                    />
                  </div>
                </Link>
              </div>
              <ul className='flex space-x-4 text-[12px] xl:text-[16px] text-gray-100 font-medium whitespace-nowrap'>
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className={`uppercase transition duration-300 ${
                        pathname === link.url
                          ? 'text-[#b1926e] py-[26px]'
                          : 'hover:text-[#553f26] hover:py-[26px]'
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
                href={bookingUrl}
                className='text-[11px] font-light bg-white text-[#553f26] px-8 py-3 hover:bg-yellow-800 hover:text-white transition min-w-[120px] text-center'
              >
                BOOK NOW !
              </a>
              {/* Right-Side Menu Toggle */}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dialog (Left-Side) */}
      <Transition appear show={isMobileMenuOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50'
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/80 bg-opacity-50' />
          </TransitionChild>
          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='ease-in duration-200 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <DialogPanel className='w-full max-w-sm h-full bg-white shadow-xl'>
                  <div className='flex flex-col h-full'>
                    <div className='flex justify-end p-4'>
                      <button
                        type='button'
                        className='text-gray-700 hover:text-red-500'
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <X className='w-7 h-7' />
                      </button>
                    </div>
                    <div className='flex-1 flex flex-col items-center justify-start'>
                      <Link
                        href='/'
                        className='flex justify-center items-center text-black mb-10'
                      >
                        <div className='flex items-center justify-center w-46 h-20 md:w-30 md:h-15 lg:w-44 lg:h-20 overflow-hidden'>
                          <Image
                            src='/assets/img/logo.png'
                            alt='Gaj Retreats'
                            width={1000}
                            height={1000}
                            className='cursor-pointer'
                          />
                        </div>
                      </Link>
                      <ul className='space-y-6 text-center'>
                        {navLinks.map((link, index) => (
                          <li key={index}>
                            <Link
                              href={link.url}
                              className={`block text-lg text-gray-700 font-medium transition duration-300 ${
                                pathname === link.url
                                  ? 'text-[#553f26] font-semibold'
                                  : 'hover:text-yellow-600'
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                        <li className='p-6'>
                          <a
                            target='_blank'
                            href={bookingUrl}
                            className='block text-center text-sm bg-[#553f26] text-white font-medium py-3 px-4 hover:bg-yellow-800 transition'
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            BOOK NOW !
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
