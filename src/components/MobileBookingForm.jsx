'use client';

import React, { useState, useEffect } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { Calendar, ChevronDown, Minus, Plus, Loader } from 'lucide-react';
import { Listbox, ListboxButton, Transition } from '@headlessui/react';

export default function MobileBookingForm({ isModal = false }) {
  const today = new DateObject();
  const tomorrow = new DateObject().add(1, 'day');

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [checkIn, setCheckIn] = useState('Wed 23 Apr');
  const [checkOut, setCheckOut] = useState('Thu 24 Apr');
  const [rooms, setRooms] = useState([{ adults: 2, children: 0 }]);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

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

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Required';
    }
    if (!email.trim()) {
      newErrors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes to clear errors
  const handleInputChange = (field, value) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (field === 'name') setName(value);
    if (field === 'email') setEmail(value);
    if (field === 'phone') setPhone(value);
  };

  // Handle form submission and redirect
  const handleBook = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const checkInFormatted = formatDateForURL(checkInDate);
    const checkOutFormatted = formatDateForURL(checkOutDate);
    const roomsStr = `${totalRooms} room${
      totalRooms > 1 ? 's' : ''
    }, ${totalAdults} adults`;

    // Save to Google Sheet
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          checkin: checkInFormatted,
          checkout: checkOutFormatted,
          rooms: roomsStr,
          sheetName: 'BookingEngine',
        }),
      });
    } catch (error) {
      console.error('Error saving to sheet:', error);
      // Still proceed with redirect even if sheet save fails
    } finally {
      setLoading(false);
    }

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

    // Add contact info
    params.append('name', name.trim());
    params.append('email', email.trim());
    params.append('phone', phone.trim());

    // Add additional parameters
    params.append('promotionCode', '');
    params.append('voucher', '');
    params.append('brands', '');
    params.append('brandFirst', '');

    // Redirect to the URL
    window.open(`${baseUrl}?${params.toString()}`, '_blank');
  };

  const containerClassName = isModal
    ? 'w-full relative'
    : 'block md:hidden w-full absolute z-20 bottom-0 left-0 right-0';

  const innerDivClassName = isModal
    ? 'flex flex-col items-stretch gap-4'
    : 'flex flex-col items-stretch gap-4 p-4';

  const dividerClassName = isModal
    ? 'w-full h-px bg-gray-400 my-4'
    : 'w-full h-px bg-gray-400';

  const guestDropdownClassName = isModal
    ? 'absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full p-4'
    : 'absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-w-sm p-4 left-1/2 -translate-x-1/2';

  return (
    <div
      className={`${containerClassName} bg-white ${
        isModal ? 'shadow-lg rounded-t-lg' : 'shadow-lg rounded-t-lg'
      }`}
    >
      <div className={innerDivClassName}>
        <div className='flex flex-col rounded-md p-1 w-full gap-3'>
          <div className='space-y-3'>
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full py-3 px-4 border-b text-base text-gray-700 focus:outline-none focus:border-[#553f26] focus:placeholder-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full py-3 px-4 border-b text-base text-gray-700 focus:outline-none focus:border-[#553f26] focus:placeholder-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <input
              type='tel'
              placeholder='Phone'
              value={phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full py-3 px-4 border-b text-base text-gray-700 focus:outline-none focus:border-[#553f26] focus:placeholder-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
        </div>
        <div className={dividerClassName}></div>

        {/* Check-in */}
        <DatePicker
          value={checkInDate}
          onChange={handleCheckInChange}
          numberOfMonths={1}
          minDate={new Date()}
          format='ddd DD MMM'
          inputClass='outline-none bg-transparent text-gray-700 w-full'
          render={(value, openCalendar) => (
            <button
              onClick={openCalendar}
              className='flex items-center justify-between rounded-md p-3 w-full cursor-pointer'
            >
              <div className='flex items-center'>
                <Calendar className='w-5 h-5 mr-2 text-gray-600' />
                <div className='flex flex-col ml-2 items-start'>
                  <span className='text-sm text-gray-500'>Check-in</span>
                  <span className='font-bold text-base'>{checkIn}</span>
                </div>
              </div>
              <ChevronDown className='w-5 h-5 ml-2 text-gray-600' />
            </button>
          )}
        />
        <div className={dividerClassName}></div>

        {/* Check-out */}
        <DatePicker
          value={checkOutDate}
          onChange={handleCheckOutChange}
          numberOfMonths={1}
          minDate={new DateObject(checkInDate).add(1, 'day')}
          format='ddd DD MMM'
          inputClass='outline-none bg-transparent text-gray-700 w-full'
          render={(value, openCalendar) => (
            <button
              onClick={openCalendar}
              className='flex items-center justify-between rounded-md p-3 w-full cursor-pointer'
            >
              <div className='flex items-center'>
                <Calendar className='w-5 h-5 mr-2 text-gray-600' />
                <div className='flex flex-col ml-2 items-start'>
                  <span className='text-sm text-gray-500'>Check-out</span>
                  <span className='font-bold text-base'>{checkOut}</span>
                </div>
              </div>
              <ChevronDown className='w-5 h-5 ml-2 text-gray-600' />
            </button>
          )}
        />
        <div className={dividerClassName}></div>

        {/* Rooms & Guests */}
        <div className='relative w-full'>
          <Listbox value={rooms} onChange={setRooms}>
            {({ open }) => (
              <>
                <ListboxButton
                  onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                  className='flex items-center justify-between rounded-md p-3 w-full cursor-pointer text-gray-700'
                >
                  <div className='flex items-center'>
                    <span className='mr-2'>👤</span>
                    <div className='flex flex-col items-start'>
                      <span className='text-sm text-gray-500'>
                        Rooms & Guests
                      </span>
                      <span className='font-bold text-base'>{`${totalRooms} ${
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
                  <div className={guestDropdownClassName}>
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

        {/* Book Button */}
        <button
          onClick={handleBook}
          disabled={loading}
          className='bg-[#553f26] cursor-pointer text-white font-semibold py-3 px-6 rounded-full hover:bg-[#553f26] transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4'
        >
          {loading ? (
            <>
              <div>
                <Loader className='w-4 h-4 animate-spin' />
              </div>
            </>
          ) : (
            'BOOK'
          )}
        </button>
      </div>
    </div>
  );
}
