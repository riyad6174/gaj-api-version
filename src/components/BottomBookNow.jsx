'use client';

import { Calendar, ChevronDown } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { DateObject } from 'react-multi-date-picker';
import DatePicker from 'react-multi-date-picker';

// Main BottomBookNow Component
export default function BottomBookNow() {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  return (
    <>
      <div className='fixed z-40 md:hidden bottom-0 flex items-center justify-center left-0 w-full bg-[#553f26]'>
        <button
          onClick={() => setIsBookingDialogOpen(true)}
          className='bg-[#553f26] py-2.5 text-white text-sm w-full text-center'
        >
          Book Now
        </button>
      </div>

      <BookingDialog
        isOpen={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
      />
    </>
  );
}

// Booking Dialog Component
function BookingDialog({ isOpen, onClose }) {
  const today = new DateObject();
  const tomorrow = new DateObject().add(1, 'day');

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [checkIn, setCheckIn] = useState('Wed 23 Apr');
  const [checkOut, setCheckOut] = useState('Thu 24 Apr');
  const [rooms, setRooms] = useState([
    { adults: 2, children: 0, childAges: [] },
  ]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [datePickerType, setDatePickerType] = useState('checkIn'); // 'checkIn' or 'checkOut'
  const [isRoomsGuestsOpen, setIsRoomsGuestsOpen] = useState(false);

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

  // Calculate total adults, children, and rooms for display
  const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
  const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);
  const totalRooms = rooms.length;

  // Format date for URL (YYYY-MM-DD)
  const formatDateForURL = (date) => {
    const d = new DateObject(date).toDate();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // Handle form submission and redirect
  const handleSearch = () => {
    const checkInFormatted = formatDateForURL(checkInDate);
    const checkOutFormatted = formatDateForURL(checkOutDate);

    const baseUrl = 'https://www.radissonhotels.com/en-us/booking/room-display';
    const params = new URLSearchParams({
      hotelCode: 'INPBHOSAAA',
      checkInDate: checkInFormatted,
      checkOutDate: checkOutFormatted,
      searchType: 'lowest',
    });

    rooms.forEach((room) => {
      params.append(`adults[]`, room.adults);
      params.append(`children[]`, room.children);
      room.childAges.forEach((age) => params.append(`aoc[]`, age));
    });

    params.append('promotionCode', '');
    params.append('voucher', '');
    params.append('brands', '');
    params.append('brandFirst', '');

    // window.location.href = `${baseUrl}?${params.toString()}#searchbar`;
    window.open(`${baseUrl}?${params.toString()}#searchbar`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 z-50 flex flex-col bg-gray-800 bg-opacity-95 md:hidden'>
        <div className='flex justify-end p-4'>
          <button onClick={onClose} className='text-white text-2xl'>
            ✕
          </button>
        </div>
        <div className='flex-1 p-4 overflow-y-auto'>
          <h2 className='text-white text-2xl font-semibold mb-4'>
            Plan Your Perfect Stay
          </h2>
          <div className='space-y-4'>
            {/* Check-in */}
            <div
              className='bg-white rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition'
              onClick={() => {
                setDatePickerType('checkIn');
                setIsDatePickerOpen(true);
              }}
            >
              <div className='flex items-center'>
                <Calendar className='w-5 h-5 text-gray-500 mr-2' />
                <div>
                  <div className='text-gray-500 text-sm'>Check-in</div>
                  <div className='text-black font-semibold'>{checkIn}</div>
                </div>
              </div>
              <ChevronDown className='text-gray-500 text-2xl' />
            </div>

            {/* Check-out */}
            <div
              className='bg-white rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition'
              onClick={() => {
                setDatePickerType('checkOut');
                setIsDatePickerOpen(true);
              }}
            >
              <div className='flex items-center'>
                <Calendar className='w-5 h-5 text-gray-500 mr-2' />
                <div>
                  <div className='text-gray-500 text-sm'>Check-out</div>
                  <div className='text-black font-semibold'>{checkOut}</div>
                </div>
              </div>
              <ChevronDown className='text-gray-500 text-2xl' />
            </div>

            {/* Rooms & Guests */}
            <div
              className='bg-white rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition'
              onClick={() => setIsRoomsGuestsOpen(true)}
            >
              <div>
                <div className='text-gray-500 text-sm'>Rooms & Guests</div>
                <div className='text-black font-semibold'>
                  {`${totalRooms} room${
                    totalRooms > 1 ? 's' : ''
                  }, ${totalAdults} adult${totalAdults > 1 ? 's' : ''}${
                    totalChildren > 0
                      ? `, ${totalChildren} child${
                          totalChildren > 1 ? 'ren' : ''
                        }`
                      : ''
                  }`}
                </div>
              </div>
              <ChevronDown className='text-gray-500 text-2xl' />
            </div>

            {/* Special Rates */}
            <div className='bg-white rounded-lg p-4 flex justify-between items-center'>
              <div>
                <div className='text-gray-500 text-sm'>Special Rates</div>
                <div className='text-black font-semibold'>
                  Lowest available rate
                </div>
              </div>
              <span className='text-gray-500 text-2xl'>
                {/* <ChevronDown /> */}
              </span>
            </div>
          </div>
        </div>
        <div className='p-4'>
          <button
            onClick={handleSearch}
            className='w-full bg-[#553f26] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#553f26] transition'
          >
            SEARCH
          </button>
        </div>
      </div>

      {/* Date Picker Dialog */}
      <DatePickerDialog
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        type={datePickerType}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
      />

      {/* Rooms & Guests Dialog */}
      <RoomsGuestsDialog
        isOpen={isRoomsGuestsOpen}
        onClose={() => setIsRoomsGuestsOpen(false)}
        rooms={rooms}
        setRooms={setRooms}
      />
    </>
  );
}

// Date Picker Dialog Component
function DatePickerDialog({
  isOpen,
  onClose,
  type,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
}) {
  const [tempCheckInDate, setTempCheckInDate] = useState(checkInDate);
  const [tempCheckOutDate, setTempCheckOutDate] = useState(checkOutDate);
  const datePickerRef = useRef(null);

  const totalNights =
    tempCheckInDate && tempCheckOutDate
      ? Math.round(
          (tempCheckOutDate.toDate() - tempCheckInDate.toDate()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  // Open calendar on initial mount
  useEffect(() => {
    if (isOpen && datePickerRef.current) {
      datePickerRef.current.openCalendar();
    }
  }, [isOpen]);

  // Handle check-in date change
  const handleCheckInChange = (date) => {
    const newCheckIn = new DateObject(date);
    setTempCheckInDate(newCheckIn);
    // Set check-out to the next day if it's before or equal to the new check-in
    if (!tempCheckOutDate || tempCheckOutDate.toDate() <= newCheckIn.toDate()) {
      setTempCheckOutDate(new DateObject(newCheckIn).add(1, 'day'));
    }
  };

  // Handle check-out date change
  const handleCheckOutChange = (date) => {
    const newCheckOut = new DateObject(date);
    // Ensure check-out is after check-in
    if (newCheckOut.toDate() > tempCheckInDate.toDate()) {
      setTempCheckOutDate(newCheckOut);
    } else {
      // Default to one day after check-in
      setTempCheckOutDate(new DateObject(tempCheckInDate).add(1, 'day'));
    }
  };

  // Reopen calendar when input is clicked
  const handleInputClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.openCalendar();
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-60 flex flex-col bg-gray-800 bg-opacity-95'>
      <div className='flex items-center p-4 bg-white shadow-md'>
        <button onClick={onClose} className='text-gray-700 text-2xl'>
          ←
        </button>
        <h2 className='text-gray-800 text-lg font-semibold flex-1 text-center'>
          Select {type === 'checkIn' ? 'Check-in' : 'Check-out'} Date
        </h2>
      </div>
      <div className='bg-white p-4 flex-1 overflow-y-auto'>
        <div className='mb-4'>
          <div className='text-gray-500 text-sm'>
            {type === 'checkIn' ? 'Check-in' : 'Check-out'}
          </div>
          <div
            className='flex items-center mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition'
            onClick={handleInputClick}
          >
            <Calendar className='w-5 h-5 text-gray-500 mr-2' />
            <div className='text-black font-semibold text-lg'>
              {(type === 'checkIn'
                ? tempCheckInDate
                : tempCheckOutDate
              )?.format('ddd DD MMM')}
            </div>
          </div>
        </div>
        <DatePicker
          ref={datePickerRef}
          value={type === 'checkIn' ? tempCheckInDate : tempCheckOutDate}
          onChange={
            type === 'checkIn' ? handleCheckInChange : handleCheckOutChange
          }
          numberOfMonths={1}
          minDate={
            type === 'checkIn'
              ? new Date()
              : new DateObject(tempCheckInDate).add(1, 'day')
          }
          format='ddd DD MMM'
          className='w-full'
          calendarPosition='bottom-center'
          hideOnSelect={true}
          render={() => <div style={{ display: 'none' }} />}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            display: 'none',
          }}
          containerStyle={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          calendarStyle={{
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            display: 'block',
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}
          headerStyle={{
            fontSize: '16px',
            fontWeight: '600',
            textTransform: 'uppercase',
            color: '#333',
            padding: '10px 0',
          }}
          dayStyle={{
            fontSize: '14px',
            padding: '8px',
            margin: '2px',
            borderRadius: '50%',
            transition: 'background-color 0.2s',
          }}
          selectedDayStyle={{
            backgroundColor: '#eab308',
            color: '#fff',
            borderRadius: '50%',
          }}
          rangeHoverStyle={{
            backgroundColor: '#fef3c7',
            borderRadius: '50%',
          }}
        />
      </div>
      <div className='p-4 bg-white'>
        <button
          onClick={() => {
            if (type === 'checkIn') {
              setCheckInDate(tempCheckInDate);
              setCheckOutDate(tempCheckOutDate);
            } else {
              setCheckOutDate(tempCheckOutDate);
            }
            onClose();
          }}
          className='w-full bg-[#553f26] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#553f26] transition'
        >
          DONE{' '}
          {/* {type === 'checkIn'
            ? `(${totalNights} NIGHT${totalNights !== 1 ? 'S' : ''})`
            : ''} */}
        </button>
      </div>
    </div>
  );
}

// Rooms & Guests Dialog Component
function RoomsGuestsDialog({ isOpen, onClose, rooms, setRooms }) {
  const [tempRooms, setTempRooms] = useState(rooms);

  const handleRoomChange = (delta) => {
    const newRoomCount = Math.max(1, tempRooms.length + delta);
    if (delta > 0) {
      setTempRooms([...tempRooms, { adults: 1, children: 0, childAges: [] }]);
    } else if (tempRooms.length > 1) {
      setTempRooms(tempRooms.slice(0, newRoomCount));
    }
  };

  const handleRemoveRoom = (index) => {
    if (tempRooms.length > 1) {
      const newRooms = tempRooms.filter((_, i) => i !== index);
      setTempRooms(newRooms);
    }
  };

  const handleAdultChange = (index, delta) => {
    const newRooms = [...tempRooms];
    newRooms[index].adults = Math.max(1, newRooms[index].adults + delta);
    setTempRooms(newRooms);
  };

  const handleChildChange = (index, delta) => {
    const newRooms = [...tempRooms];
    newRooms[index].children = Math.max(0, newRooms[index].children + delta);
    if (newRooms[index].children === 0) {
      newRooms[index].childAges = [];
    } else {
      newRooms[index].childAges = Array(newRooms[index].children).fill(0);
    }
    setTempRooms(newRooms);
  };

  const handleChildAgeChange = (roomIndex, childIndex, age) => {
    const newRooms = [...tempRooms];
    newRooms[roomIndex].childAges[childIndex] = age;
    setTempRooms(newRooms);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-60 flex flex-col bg-gray-800 bg-opacity-95'>
      <div className='flex items-center p-4 bg-white shadow-md'>
        <button onClick={onClose} className='text-gray-700 text-2xl'>
          ←
        </button>
        <h2 className='text-gray-800 text-lg font-semibold flex-1 text-center'>
          Select Occupancy
        </h2>
      </div>
      <div className='bg-white p-4 flex-1 overflow-y-auto'>
        <div className='flex items-center justify-between mb-4 px-4'>
          <span className='text-gray-700 font-semibold'>Rooms</span>
          <div className='flex items-center'>
            <button
              onClick={() => handleRoomChange(-1)}
              className='w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-100 transition'
            >
              −
            </button>
            <span className='mx-2 text-gray-500'>{tempRooms.length}</span>
            <button
              onClick={() => handleRoomChange(1)}
              className='w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-100 transition'
            >
              +
            </button>
          </div>
        </div>

        {tempRooms.map((room, index) => (
          <div
            key={index}
            className='border-t pt-4 bg-gray-100 p-2 relative rounded-lg'
          >
            <div className='flex justify-between items-center'>
              <h4 className='font-semibold bg-gray-200 px-2 py-2 text-gray-700 mb-3 rounded'>
                Room {index + 1}
              </h4>
              {tempRooms.length > 1 && (
                <button
                  onClick={() => handleRemoveRoom(index)}
                  className='text-red-600 text-sm font-semibold hover:text-red-700 transition'
                >
                  Remove
                </button>
              )}
            </div>
            {/* Adults */}
            <div className='flex items-center justify-between mb-4 px-2'>
              <span className='text-gray-600 text-sm font-semibold'>
                Nº of adults
              </span>
              <div className='flex items-center'>
                <button
                  onClick={() => handleAdultChange(index, -1)}
                  className='w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-100 transition'
                >
                  −
                </button>
                <span className='mx-2 text-gray-500'>{room.adults}</span>
                <button
                  onClick={() => handleAdultChange(index, 1)}
                  className='w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-100 transition'
                >
                  +
                </button>
              </div>
            </div>
            {/* Children */}
            <div className='flex items-center justify-between mb-4 px-2'>
              <span className='text-gray-600 text-sm font-semibold'>
                Nº of children <br />
                <span className='text-xs'>(Up to 12 years old)</span>
              </span>
              <div className='flex items-center'>
                <button
                  onClick={() => handleChildChange(index, -1)}
                  className='w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-100 transition'
                >
                  −
                </button>
                <span className='mx-2 text-gray-500'>{room.children}</span>
                <button
                  onClick={() => handleChildChange(index, 1)}
                  className='w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-100 transition'
                >
                  +
                </button>
              </div>
            </div>
            {/* Child Ages */}
            {room.children > 0 && (
              <div className='mb-4 px-2'>
                <div className='text-gray-600 mb-2 text-sm'>
                  Enter age of children on check-out date
                </div>
                {Array.from({ length: room.children }).map((_, childIndex) => (
                  <div key={childIndex} className='mb-4'>
                    <div className='text-gray-700 mb-1 text-sm'>
                      Age of child {childIndex + 1}
                    </div>
                    <div className='flex items-center'>
                      <input
                        type='range'
                        min='0'
                        max='12'
                        value={room.childAges[childIndex] || 0}
                        onChange={(e) =>
                          handleChildAgeChange(
                            index,
                            childIndex,
                            parseInt(e.target.value)
                          )
                        }
                        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                      />
                      <span className='ml-2 text-gray-600'>
                        {room.childAges[childIndex] || 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className='flex justify-between items-center mt-4 px-4'>
          <button
            onClick={() => handleRoomChange(1)}
            className='text-red-600 text-sm font-semibold flex items-center hover:text-red-700 transition'
          >
            ADD NEW ROOM
            <span className='ml-1 text-gray-500'>ⓘ</span>
          </button>
        </div>
      </div>
      <div className='p-4 bg-white'>
        <button
          onClick={() => {
            setRooms(tempRooms);
            onClose();
          }}
          className='w-full bg-[#553f26] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#553f26] transition'
        >
          DONE
        </button>
      </div>
    </div>
  );
}
