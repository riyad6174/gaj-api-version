'use client';

import React, { useState } from 'react';
import { Calendar, Users, Search } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingFormBackup() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guestDropdown, setGuestDropdown] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  return (
    <div className='container   absolute z-20  bottom-[-50px]   left-1/2 transform -translate-x-1/2 w-[95%] md:w-[80%] lg:w-[60%] bg-white shadow-xl p-4 md:py-6 rounded-sm grid grid-cols-2   md:rounded-full md:flex  md:flex-row md:items-center md:justify-between md:space-x-4 gap-y-4 gap-2'>
      {/* Check-in Date */}
      <div className='relative col-span-2  flex flex-col  items-start justify-center md:px-10 px-5 py-4 md:py-0 border border-yellow-700 md:border-0 rounded-sm'>
        <p className='text-sm md:text-lg font-semibold text-gray-700'>
          Check in
        </p>
        <div
          className='text-yellow-800 cursor-pointer flex items-center justify-center'
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar className='w-4 h-4 mr-1' />
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            minDate={new Date()}
            placeholderText='Add dates'
            className='outline-none bg-transparent cursor-pointer placeholder:text-sm md:placeholder:text-[16px]'
          />
        </div>
      </div>

      {/* Check-out Date */}
      <div className='relative col-span-2  flex flex-col items-start justify-center px-5 md:px-0 py-4 md:py-0 border border-yellow-700 md:border-0 rounded-sm'>
        <p className='text-sm md:text-lg font-semibold text-gray-700'>
          Check out
        </p>
        <div
          className='text-yellow-800 cursor-pointer flex items-center justify-center'
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar className='w-4 h-4 mr-1' />
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            minDate={checkIn || new Date()}
            placeholderText='Add dates'
            className='outline-none bg-transparent cursor-pointer placeholder:text-sm md:placeholder:text-[16px]'
          />
        </div>
      </div>

      {/* Guests Selection */}
      <div className='relative col-span-2  flex flex-col items-start justify-center px-5 md:px-0 py-4 md:py-0 border border-yellow-700 md:border-0 rounded-sm'>
        <p className='text-sm md:text-lg font-semibold text-gray-700'>Guests</p>
        <div
          className='text-yellow-800 cursor-pointer flex items-center justify-center'
          onClick={() => setGuestDropdown(!guestDropdown)}
        >
          <Users className='w-4 h-4 mr-1' />
          <p className='text-sm md:text-[16px]'>
            {adults} Adult(s), {children} Child(ren)
          </p>
        </div>

        {/* Dropdown for Guest Selection */}
        {guestDropdown && (
          <div className='absolute top-20 left-0 bg-white shadow-lg rounded-lg p-4 w-56 text-left'>
            {/* Adults */}
            <div className='flex justify-between items-center mb-2 '>
              <p className='text-sm font-semibold'>Adults</p>
              <div className='flex items-center space-x-2'>
                <button
                  className='bg-gray-200 w-10 h-10 rounded-full'
                  disabled={adults === 1}
                  onClick={() => setAdults(adults - 1)}
                >
                  -
                </button>
                <span>{adults}</span>
                <button
                  className='bg-gray-200 w-10 h-10 rounded-full'
                  onClick={() => setAdults(adults + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className='flex justify-between items-center'>
              <p className='text-sm font-semibold'>Children</p>
              <div className='flex items-center space-x-2'>
                <button
                  className='bg-gray-200 w-10 h-10 rounded-full'
                  disabled={children === 0}
                  onClick={() => setChildren(children - 1)}
                >
                  -
                </button>
                <span>{children}</span>
                <button
                  className='bg-gray-200 w-10 h-10 rounded-full'
                  onClick={() => setChildren(children + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Button */}
      <button className='bg-yellow-800 text-white flex items-center justify-center p-4 rounded-full col-span-2'>
        <Search className='w-5 h-5' />
      </button>
    </div>
  );
}
