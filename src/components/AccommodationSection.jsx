import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ImageSlider from './ImageSlider';
import { baseUrl } from '../utils/network';

// getStaticProps for pre-fetching data at build time (SEO and performance optimization)
export async function getStaticProps() {
  try {
    const res = await fetch(
      `${baseUrl}/frontend/data/page-data-list/accommodations`
    );
    const result = await res.json();

    if (!result.success || !result.data) {
      return { props: { rooms: [] } };
    }

    return {
      props: {
        rooms: result.data.map((room) => ({
          id: room.id,
          title: room.title,
          subtitle: room.sub_title,
          price: room.short_description,
          description: room.description,
          images: room.images.map((img) => img.image_path),
          imageAlt: room.image_alt_text,
          btn_text: room.btn_text,
          btn_link: room.btn_link,
          is_enquire: room.is_enquire,
          has_btn2: room.has_btn2,
          btn2_text: room.btn2_text,
          btn2_link: room.btn2_link,
          is_enquire2: room.is_enquire2,
        })),
      },
      revalidate: 60, // Revalidate every 60 seconds for Incremental Static Regeneration (ISR)
    };
  } catch (error) {
    console.error('Error fetching accommodation data:', error);
    return { props: { rooms: [] } };
  }
}

export default function AccommodationSection({
  rooms,
  subTitles,
  descriptions,
}) {
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

  // Fallback state for client-side fetching (optional, for dynamic updates)
  const [data, setData] = useState(rooms || []);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Client-side fetching if data needs to be refreshed without rebuilding
  useEffect(() => {
    if (!rooms || rooms.length === 0) {
      setIsDataLoading(true);

      fetch(`${baseUrl}/frontend/data/page-data-list/accommodations`)
        .then((res) => res.json())
        .then((result) => {
          if (result.success && result.data) {
            setData(
              result.data.map((room) => ({
                id: room.id,
                title: room.title,
                subtitle: room.sub_title,
                price: room.short_description,
                description: room.description,
                images: room.images.map((img) => img.image_path),
                imageAlt: room.image_alt_text,
                btn_text: room.btn_text,
                btn_link: room.btn_link,
                is_enquire: room.is_enquire,
                has_btn2: room.has_btn2,
                btn2_text: room.btn2_text,
                btn2_link: room.btn2_link,
                is_enquire2: room.is_enquire2,
              }))
            );
          }
        })
        .catch((error) =>
          console.error('Error fetching accommodation data:', error)
        )
        .finally(() => setIsDataLoading(false));
    }
  }, [rooms]);

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
  };

  // Handle phone input change
  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value, // Value includes the country code (e.g., "+91")
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation before submission
    if (!validateForm()) return;

    setIsLoading(true);
    formData.submissionTime = new Date().toLocaleString();

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, sheetName: 'Accommodation' }), // Specify the sheet name
      });

      setIsLoading(false);

      if (response.ok) {
        console.log('Form data submitted successfully!');
        setIsSubmitted(true);
        setTimeout(() => {
          closeDrawer();
        }, 2000);
      } else {
        console.error('Failed to submit form data.');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error submitting form data:', error);
    }
  };

  // Helper to strip HTML tags for plain text
  const stripHtml = (html) => {
    if (typeof window === 'undefined') {
      // Server-side: Use regex to strip HTML
      return html.replace(/<[^>]+>/g, '');
    }
    // Client-side: Use DOMParser for more robust HTML stripping
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <section className='py-16 bg-white'>
      <div className='mx-auto'>
        {/* Section Heading */}
        <div className='text-center container'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
            {subTitles && subTitles[0]
              ? subTitles[0]
              : 'Luxury Accommodations in Himachal Pradesh'}
          </h2>
          <p className='mt-4 text-gray-600'>
            {descriptions && descriptions[0]
              ? stripHtml(descriptions[0])
              : 'Set in picturesque storybook landscapes, Koti Resorts is a hill-top property, modelled after the traditional chalet-style hotels of the Swiss Alps. Enjoy the beautifully kept lawns, scenic views, a range of recreational activities, and the historic charm of a colonial town complete with all the finer comforts you could desire. The elegant interiors and the home-like, family-friendly ambience, makes Koti the perfect cold-weather hideaway for visitors travelling from near and far. Ideal for those looking to break away from the crowds and explore the quieter landscapes and off-beaten parts around Shimla.'}
          </p>
          <div className='mt-2 flex justify-center items-center'>
            <span className='h-[2px] w-16 bg-gray-400'></span>
            <span className='mx-2 text-gray-500 text-lg'>✿</span>
            <span className='h-[2px] w-16 bg-gray-400'></span>
          </div>
        </div>
        <div className='text-center container mt-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
            {subTitles && subTitles[1] ? subTitles[1] : 'Rooms'}
          </h2>
          <p className='mt-4 text-gray-600'>
            {descriptions && descriptions[1]
              ? stripHtml(descriptions[1])
              : 'As one of the oldest hotels in Mashobra, Koti Resorts has all the charm, atmosphere and service befitting its stature. We have a total of fifty elegantly furnished rooms in 4 categories, designed to cater to families of all sizes.'}
          </p>
          {/* <p className='mt-4 text-gray-600'>
            {descriptions && descriptions[1]
              ? stripHtml(descriptions[1])
              : 'All our rooms are coordinated in a way to make sure that you leave the noise at the door, retreating to the sanctuary that is the room. These sunlit havens come with independent balconies, and after a long day, you can draw the curtains, withdraw for a beat from the busyness of the world, and enjoy your cup of tea.'}
          </p> */}
        </div>
        <div className='bg-slate-50 p-4 md:p-10 mt-14'>
          <div className='text-center pb-8'>
            <h2 className='text-2xl font-bold'>We are Unique</h2>
          </div>
          <div className='text-center container grid grid-cols-2 md:grid-cols-4 gap-y-6 mt-4'>
            <div className='flex flex-col items-center gap-3'>
              <img
                src='https://www.svgrepo.com/show/166316/toiletries.svg'
                alt='Toiletries'
                className='w-10 h-10'
              />
              <span className='text-md text-gray-600'>Toiletries</span>
            </div>
            <div className='flex flex-col items-center gap-3'>
              <img
                src='https://www.svgrepo.com/show/297186/television-tv.svg'
                alt='DTH Television'
                className='w-10 h-10'
              />
              <span className='text-md text-gray-600'>DTH Television</span>
            </div>
            <div className='flex flex-col items-center gap-3'>
              <img
                src='https://www.svgrepo.com/show/83698/car-parking.svg'
                alt='On-site parking'
                className='w-10 h-10'
              />
              <span className='text-md text-gray-600'>On-site parking</span>
            </div>
            <div className='flex flex-col items-center gap-3'>
              <img
                src='https://www.svgrepo.com/show/513070/wifi-1029.svg'
                alt='Hi Speed WIFI'
                className='w-10 h-10'
              />
              <span className='text-md text-gray-600'>Hi Speed WIFI</span>
            </div>
            <div className='flex flex-col items-center gap-3'>
              <img
                src='https://www.svgrepo.com/show/404634/beverage-coffee-drink-machine-maker-shop.svg'
                alt='Tea Coffee Maker'
                className='w-10 h-10'
              />
              <span className='text-md text-gray-600'>Tea Coffee Maker</span>
            </div>
            <div className='flex flex-col items-center gap-3'>
              <img
                src='https://www.svgrepo.com/show/490859/mini-bar.svg'
                alt='Mini Bar'
                className='w-10 h-10'
              />
              <span className='text-md text-gray-600'>Mini Bar</span>
            </div>
            <div className='flex flex-col items-center gap-3'>
              <img
                src='https://www.svgrepo.com/show/493976/air-conditioner.svg'
                alt='All season AC'
                className='w-10 h-10'
              />
              <span className='text-md text-gray-600'>All season AC</span>
            </div>
            <div className='flex flex-col items-center gap-3'>
              <img
                src='https://www.svgrepo.com/show/429568/safebox-bank-locker-3.svg'
                alt='E-Safes'
                className='w-10 h-10'
              />
              <span className='text-md text-gray-600'>E-Safes</span>
              <span className='text-xs text-gray-600'>
                *Available in Premium, Suite and Deluxe rooms
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Room Sections */}
        <div className='mt-10'>
          {isDataLoading ? (
            <div className='text-center text-gray-600'>Loading rooms...</div>
          ) : data.length === 0 ? (
            <div className='text-center text-gray-600'>No rooms available.</div>
          ) : (
            data.map((room, index) => (
              <div
                key={room.id}
                className={`${
                  index % 2 === 1 ? 'pattern md:py-20 py-10' : ''
                } mt-10 md:mt-20`}
              >
                <div className='container grid grid-cols-1 md:grid-cols-5 gap-20 items-center'>
                  {/* Text Content */}
                  <div
                    className={`col-span-5 md:col-span-2 ${
                      index % 2 === 0 ? '' : 'md:order-last'
                    }`}
                  >
                    <h2 className='text-2xl font-semibold text-gray-900'>
                      {room.title}
                    </h2>
                    <span
                      className='font-normal text-gray-600 text-sm'
                      dangerouslySetInnerHTML={{ __html: room.subtitle }}
                    />
                    {room.price && (
                      <p className='font-normal text-yellow-700 text-md py-3'>
                        {room.price}
                      </p>
                    )}
                    <div
                      className='mt-4 text-gray-600 text-justify break-words'
                      dangerouslySetInnerHTML={{ __html: room.description }}
                    />
                    <div className='mt-10 flex space-x-4'>
                      {/* Primary Button */}
                      {room.is_enquire === 0 ? (
                        <button
                          onClick={openDrawer}
                          className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
                        >
                          {room.btn_text || 'Enquire Now'}
                        </button>
                      ) : (
                        <Link
                          href={room.btn_link || '#'}
                          className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
                        >
                          {room.btn_text || 'Read More'}
                        </Link>
                      )}
                      {/* Secondary Button */}
                      {room.has_btn2 === 1 &&
                        (room.is_enquire2 === 0 ? (
                          <button
                            onClick={openDrawer}
                            className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
                          >
                            {room.btn2_text || 'Enquire Now'}
                          </button>
                        ) : (
                          <Link
                            href={room.btn2_link || '#'}
                            className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
                          >
                            {room.btn2_text || 'Read More'}
                          </Link>
                        ))}
                    </div>
                  </div>
                  {/* Image */}
                  <div
                    className={`relative col-span-5 md:col-span-3 ${
                      index % 2 === 0
                        ? 'order-first md:order-none'
                        : 'order-first'
                    }`}
                  >
                    <div className='absolute -top-3 -left-3 w-[30%] h-[50%] border-t-[12px] border-l-[12px] border-yellow-800'></div>
                    <div className='relative z-10 shadow-lg overflow-hidden'>
                      <ImageSlider
                        images={
                          room.images.length > 0
                            ? room.images
                            : ['/assets/room/placeholder.jpg']
                        }
                        alt={room.imageAlt || room.title}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Offcanvas Drawer */}
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
                      alt='koti logo'
                      className='w-44 mx-auto'
                    />
                    <p className='mt-2 text-gray-600 font-normal md:text-sm text-[12px] text-center px-2'>
                      Thank you for your interest in Koti Resorts. Please kindly
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
      </div>
    </section>
  );
}
