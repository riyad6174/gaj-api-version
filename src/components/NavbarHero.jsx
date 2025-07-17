'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  DialogTitle,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import { AlignJustify, AlignRight, X } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import 'react-phone-input-2/lib/style.css';
import { baseUrl } from '@/utils/network';
const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false });

export default function NavbarHero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu (left)
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    submissionTime: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const closeDrawer = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      submissionTime: '',
    });
  };

  const openDrawer = () => {
    setIsOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // Handle phone input change
  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
    setErrors({
      ...errors,
      phone: '',
    });
  };

  // Simple form validation function
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.phone) formErrors.phone = 'Phone number is required';
    if (!formData.message) formErrors.message = 'Message is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    formData.submissionTime = new Date().toLocaleString();

    try {
      // First API call: Submit to spreadsheet
      const spreadsheetResponse = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, sheetName: 'Home' }),
      });

      // Second API call: Submit to /frontend/data/save-contact
      const formDataPayload = new FormData();
      formDataPayload.append('name', formData.name);
      formDataPayload.append('phone', formData.phone);
      formDataPayload.append('email', formData.email);
      formDataPayload.append('message', formData.message);
      formDataPayload.append('page', 'Home');
      formDataPayload.append('section', 'General Enquiry');

      const contactResponse = await fetch(
        `${baseUrl}/frontend/data/save-contact`,
        {
          method: 'POST',
          body: formDataPayload,
        }
      );

      setIsLoading(false);

      if (spreadsheetResponse.ok && contactResponse.ok) {
        console.log('Form data submitted successfully to both APIs!');
        setIsSubmitted(true);
        setTimeout(() => {
          closeDrawer();
        }, 2000);
      } else {
        console.error('Failed to submit form data to one or both APIs.');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error submitting form data:', error.message);
      console.error('API URL:', `${baseUrl}/frontend/data/save-contact`);
      console.error('Error details:', error);
    }
  };

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
              <ul className='flex space-x-4 text-[12px] xl:text-[15px] text-gray-100 font-medium whitespace-nowrap'>
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
              <button
                onClick={openDrawer}
                className='text-[11px] font-light bg-white text-[#553f26] px-6 py-3 hover:bg-yellow-800 hover:text-white transition md:min-w-[100px] lg:min-w-[120px] text-center'
              >
                ENQUIRE NOW !
              </button>
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

      <Transition show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeDrawer}>
          <div
            className='fixed inset-0 bg-black bg-blend-overlay opacity-50'
            aria-hidden='true'
          />
          <div className='fixed inset-0 flex justify-end'>
            <TransitionChild
              as={Fragment}
              enter='transition ease-out duration-300 transform'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <DialogPanel className='w-full max-w-full lg:max-w-md bg-gray-200 shadow-xl min-h-screen overflow-y-auto p-4 sm:p-6'>
                <DialogTitle className='text-lg font-bold text-gray-900 px-6'>
                  <img
                    src='/assets/img/logo.png'
                    alt='gaj logo'
                    className='w-44 mx-auto'
                  />
                  <p className='mt-2 text-gray-600 font-normal md:text-sm text-[12px] text-center px-2'>
                    Thank you for your interest in Gaj Retreats. Please kindly
                    provide us with details of your request using the form
                    below.
                  </p>
                </DialogTitle>

                {isSubmitted ? (
                  <p className='mt-6 sm:mt-10 text-green-600 text-center text-sm sm:text-base'>
                    Your request has been submitted successfully. <br /> Thank
                    you for your enquiry. We will get back to you shortly.
                  </p>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className='mt-2 space-y-2 px-4 sm:px-6'
                  >
                    {/* Name Field */}
                    <div>
                      <label className='block text-gray-700 text-sm'>
                        Name
                      </label>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className='w-full mt-1 px-3 py-1 border bg-white focus:outline-none focus:ring-2 focus:ring-yellow-800 text-sm sm:text-base'
                      />
                      {errors.name && (
                        <span className='text-red-500 text-xs sm:text-sm'>
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className='block text-gray-700 text-sm'>
                        Email
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className='w-full mt-1 px-3 py-1 border bg-white focus:outline-none focus:ring-2 focus:ring-yellow-800 text-sm sm:text-base'
                      />
                      {errors.email && (
                        <span className='text-red-500 text-xs sm:text-sm'>
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className='block text-gray-700 text-sm'>
                        Phone
                      </label>
                      <PhoneInput
                        country={'in'}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        inputProps={{
                          name: 'phone',
                          required: true,
                        }}
                        containerStyle={{ marginTop: '0.25rem' }}
                        inputStyle={{
                          width: '100%',
                          padding: '0.375rem 2.5rem sm:0.5rem 3rem',
                          border: '1px solid #000',
                          backgroundColor: '#ffffff',
                          outline: 'none',
                          height: '2rem sm:2.5rem',
                          fontSize: '0.875rem sm:1rem',
                        }}
                        buttonStyle={{
                          border: '1px solid #000',
                          backgroundColor: '#ffffff',
                        }}
                        dropdownStyle={{
                          border: '1px solid #d1d5db',
                        }}
                        specialLabel={false}
                      />
                      {errors.phone && (
                        <span className='text-red-500 text-xs sm:text-sm'>
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className='block text-gray-700 text-sm'>
                        Message
                      </label>
                      <textarea
                        name='message'
                        rows={1}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className='w-full mt-1 px-3 py-1 border bg-white focus:outline-none focus:ring-2 focus:ring-yellow-800 text-sm sm:text-base'
                      ></textarea>
                      {errors.message && (
                        <span className='text-red-500 text-xs sm:text-sm'>
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit and Close Buttons */}
                    <div className='space-y-2'>
                      <button
                        type='submit'
                        className='w-full border border-gray-700 text-gray-800 py-1 hover:text-gray-100 hover:bg-yellow-800 transition text-sm sm:text-base'
                      >
                        {isLoading ? 'Submitting...' : 'Submit'}
                      </button>
                      <button
                        type='button'
                        onClick={closeDrawer}
                        className='w-full border border-red-700 text-red-800 py-1 hover:text-gray-100 hover:bg-yellow-800 transition text-sm sm:text-base'
                      >
                        Close
                      </button>
                    </div>
                  </form>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
