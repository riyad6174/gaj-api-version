'use client';

import React, { useState, useEffect } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { Calendar, ChevronDown, Minus, Percent, Plus } from 'lucide-react';
import { Listbox, ListboxButton, Transition } from '@headlessui/react';

export default function BookingForm() {
  const today = new DateObject();
  const tomorrow = new DateObject().add(1, 'day');

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [checkIn, setCheckIn] = useState('Wed 23 Apr');
  const [checkOut, setCheckOut] = useState('Thu 24 Apr');
  const [rooms, setRooms] = useState([{ adults: 2, children: 0 }]);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [specialRate] = useState('Lowest available rate');

  // Sync check-in and check-out display strings
  useEffect(() => {
    const formatDate = (date) => {
      const options = { weekday: 'short', day: '2-digit', month: 'short' };
      return date
        .toDate()
        .toLocaleDateString('en-US', options)
        .replace(',', '');
    };

    setCheckIn(formatDate(checkInDate));
    setCheckOut(formatDate(checkOutDate));
  }, [checkInDate, checkOutDate]);

  // Handle room and guest changes
  const handleRoomChange = (delta) => {
    const newRoomCount = Math.max(1, rooms.length + delta);
    if (delta > 0) {
      setRooms([...rooms, { adults: 1, children: 0 }]);
    } else if (rooms.length > 1) {
      setRooms(rooms.slice(0, newRoomCount));
    }
  };

  const handleAdultChange = (index, delta) => {
    const newRooms = [...rooms];
    newRooms[index].adults = Math.max(1, newRooms[index].adults + delta);
    setRooms(newRooms);
  };

  const handleChildChange = (index, delta) => {
    const newRooms = [...rooms];
    newRooms[index].children = Math.max(0, newRooms[index].children + delta);
    setRooms(newRooms);
  };

  // Calculate total adults and rooms for display
  const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
  const totalRooms = rooms.length;

  // Format date for URL (YYYY-MM-DD)
  const formatDateForURL = (date) => {
    const d = new DateObject(date).toDate();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // Handle check-in date change
  const handleCheckInChange = (date) => {
    const newCheckIn = new DateObject(date);
    setCheckInDate(newCheckIn);
    // Set check-out to the next day by default
    const newCheckOut = new DateObject(newCheckIn).add(1, 'day');
    setCheckOutDate(newCheckOut);
  };

  // Handle check-out date change
  const handleCheckOutChange = (date) => {
    const newCheckOut = new DateObject(date);
    // Ensure check-out is after check-in
    if (newCheckOut.toDate() > checkInDate.toDate()) {
      setCheckOutDate(newCheckOut);
    } else {
      // If invalid, set to one day after check-in
      setCheckOutDate(new DateObject(checkInDate).add(1, 'day'));
    }
  };

  // Handle form submission and redirect
  const handleBook = () => {
    const checkInFormatted = formatDateForURL(checkInDate);
    const checkOutFormatted = formatDateForURL(checkOutDate);

    // Construct URL with booking details
    const baseUrl = 'https://www.radissonhotels.com/en-us/booking/room-display';
    const params = new URLSearchParams({
      hotelCode: 'INPBHOSAAA',
      checkInDate: checkInFormatted,
      checkOutDate: checkOutFormatted,
      searchType: 'lowest',
    });

    // Add adults and children for each room
    rooms.forEach((room) => {
      params.append(`adults[]`, room.adults);
      params.append(`children[]`, room.children);
      params.append(`aoc[]`, '');
    });

    // Add additional parameters
    params.append('promotionCode', '');
    params.append('voucher', '');
    params.append('brands', '');
    params.append('brandFirst', '');

    // Redirect to the URL
    window.open(`${baseUrl}?${params.toString()}`, '_blank');
  };

  return (
    <div className='hidden md:block w-full md:max-w-5xl xl:max-w-6xl mx-auto p-4 absolute z-20 bottom-[-160px] md:bottom-[-50px]'>
      <div className='bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-4'>
        {/* Check-in */}
        <DatePicker
          value={checkInDate}
          onChange={handleCheckInChange}
          numberOfMonths={1}
          minDate={new Date()}
          format='ddd DD MMM'
          inputClass='outline-none bg-transparent text-gray-700 w-full md:w-32'
          render={(value, openCalendar) => (
            <button
              onClick={openCalendar}
              className='flex items-center justify-between rounded-md p-2 w-full md:w-52 cursor-pointer'
            >
              <div className='flex items-center'>
                <Calendar className='w-5 h-5 mr-2 text-gray-600' />
                <div className='flex flex-col ml-2 items-start'>
                  <span className='text-sm text-gray-500'>Check-in</span>
                  <span className='font-bold'>{checkIn}</span>
                </div>
              </div>
              <ChevronDown className='w-5 h-5 ml-2 text-gray-600' />
            </button>
          )}
        />
        <div className='w-1 h-14 border-l border-gray-400'></div>

        {/* Check-out */}
        <DatePicker
          value={checkOutDate}
          onChange={handleCheckOutChange}
          numberOfMonths={1}
          minDate={new DateObject(checkInDate).add(1, 'day')}
          format='ddd DD MMM'
          inputClass='outline-none bg-transparent text-gray-700 w-full md:w-32'
          render={(value, openCalendar) => (
            <button
              onClick={openCalendar}
              className='flex items-center justify-between rounded-md p-2 w-full md:w-52 cursor-pointer'
            >
              <div className='flex items-center'>
                <Calendar className='w-5 h-5 mr-2 text-gray-600' />
                <div className='flex flex-col ml-2 items-start'>
                  <span className='text-sm text-gray-500'>Check-out</span>
                  <span className='font-bold'>{checkOut}</span>
                </div>
              </div>
              <ChevronDown className='w-5 h-5 ml-2 text-gray-600' />
            </button>
          )}
        />
        <div className='w-1 h-14 border-l border-gray-400'></div>

        {/* Rooms & Guests */}
        <div className='relative w-full md:w-auto'>
          <Listbox value={rooms} onChange={setRooms}>
            {({ open }) => (
              <>
                <ListboxButton
                  onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                  className='flex items-center justify-between rounded-md p-2 w-full md:w-52 cursor-pointer text-gray-700'
                >
                  <div className='flex items-center'>
                    <span className='mr-2'>👤</span>
                    <div className='flex flex-col items-start'>
                      <span className='text-sm text-gray-500'>
                        Rooms & Guests
                      </span>
                      <span className='font-bold'>{`${totalRooms} ${
                        totalRooms > 1 ? 'rooms' : 'room'
                      }, ${totalAdults} adults`}</span>
                    </div>
                  </div>
                  <ChevronDown className='w-5 h-5' />
                </ListboxButton>

                <Transition
                  show={isGuestDropdownOpen}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <div className='absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-96 p-4'>
                    {/* Total Rooms */}
                    <div className='flex items-center justify-between mb-4'>
                      <span className='text-gray-700 font-semibold'>Rooms</span>
                      <div className='flex items-center'>
                        <button
                          onClick={() => handleRoomChange(-1)}
                          className='p-1 border rounded-full'
                        >
                          <Minus className='w-5 h-5 text-gray-500' />
                        </button>
                        <span className='mx-2'>{totalRooms}</span>
                        <button
                          onClick={() => handleRoomChange(1)}
                          className='p-1 border rounded-full'
                        >
                          <Plus className='w-5 h-5 text-gray-500' />
                        </button>
                      </div>
                    </div>

                    {/* Room Details */}
                    {rooms.map((room, index) => (
                      <div key={index} className='mb-4 border-t pt-2'>
                        <h4 className='font-semibold text-gray-700 mb-2'>
                          Room {index + 1}
                        </h4>
                        {/* Adults */}
                        <div className='flex items-center justify-between mt-2'>
                          <span className='text-gray-700'>No. of adults</span>
                          <div className='flex items-center'>
                            <button
                              onClick={() => handleAdultChange(index, -1)}
                              className='p-1 border rounded-full'
                            >
                              <Minus className='w-5 h-5 text-gray-500' />
                            </button>
                            <span className='mx-2'>{room.adults}</span>
                            <button
                              onClick={() => handleAdultChange(index, 1)}
                              className='p-1 border rounded-full'
                            >
                              <Plus className='w-5 h-5 text-gray-500' />
                            </button>
                          </div>
                        </div>
                        {/* Children */}
                        <div className='flex items-center justify-between mt-2'>
                          <span className='text-gray-700'>
                            No. of children <br />
                            (Up to 12 years old)
                          </span>
                          <div className='flex items-center'>
                            <button
                              onClick={() => handleChildChange(index, -1)}
                              className='p-1 border rounded-full'
                            >
                              <Minus className='w-5 h-5 text-gray-500' />
                            </button>
                            <span className='mx-2'>{room.children}</span>
                            <button
                              onClick={() => handleChildChange(index, 1)}
                              className='p-1 border rounded-full'
                            >
                              <Plus className='w-5 h-5 text-gray-500' />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add New Room and Done Button */}
                    <div className='flex justify-between items-center mt-4'>
                      <button
                        onClick={() => handleRoomChange(1)}
                        className='text-yellow-700 text-sm font-semibold'
                      >
                        ADD NEW ROOM
                      </button>
                      <button
                        onClick={() => setIsGuestDropdownOpen(false)}
                        className='bg-[#553f26] text-white font-semibold py-1 px-4 rounded-full hover:bg-red-600 transition-colors'
                      >
                        DONE
                      </button>
                    </div>
                  </div>
                </Transition>
              </>
            )}
          </Listbox>
        </div>
        <div className='w-1 h-14 border-l border-gray-400'></div>

        {/* Special Rate */}
        <div className='flex items-center rounded-md p-2 w-full md:w-56'>
          <Percent className='w-5 h-5 mr-2 font- text-gray-600' />
          <div className='flex flex-col items-start w-full'>
            <span className='text-sm text-gray-500'>Special Rates</span>
            <span className='text-md font-bold text-black'>
              Lowest Available Rate
            </span>
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBook}
          className='bg-[#553f26] cursor-pointer text-white font-semibold py-2 px-6 rounded-full hover:bg-[#553f26] transition-colors w-full md:w-auto'
        >
          BOOK
        </button>
      </div>
    </div>
  );
}
