'use client';

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
import dynamic from 'next/dynamic';
import 'react-phone-input-2/lib/style.css';
import ImageSlider from '../components/ImageSlider';
import { baseUrl } from '../utils/network';

// Dynamically import PhoneInput to avoid SSR issues
const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false });

export default function OfferSection({
  offerData: initialData,
  subTitles,
  descriptions: descriptions = [],
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
  const [offerData, setOfferData] = useState(initialData || []);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Client-side fallback for dynamic updates
  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      setIsDataLoading(true);
      fetch(`${baseUrl}/frontend/data/page-data-list/offers`)
        .then((res) => res.json())
        .then((result) => {
          if (result.success && result.data) {
            const mappedData = result.data.map((item) => ({
              id: item.id,
              title: item.title,
              sub_title: item.sub_title,
              description: item.description,
              feature_1: item.feature_1,
              feature_2: item.feature_2,
              images: item.images?.map((img) => img.image_path) || [
                item.image_path || '/assets/offer/placeholder.jpg',
              ],
              imageAlt: item.image_alt_text || item.title,
              btn_text: item.btn_text || 'Know More',
              btn_link: item.btn_link || '#',
              is_enquire: item.is_enquire || 0,
              has_btn2: item.has_btn2 || 0,
              btn2_text: item.btn2_text || 'Enquire Now',
              btn2_link: item.btn2_link || '#',
              is_enquire2: item.is_enquire2 || 0,
            }));
            setOfferData(mappedData);
          }
        })
        .catch((error) => console.error('Error fetching offer data:', error))
        .finally(() => setIsDataLoading(false));
    }
  }, [initialData]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };

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

    if (!validateForm()) return;

    setIsLoading(true);
    formData.submissionTime = new Date().toLocaleString();

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, sheetName: 'Offers' }),
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

  return (
    <section className='py-16 bg-white'>
      <div className='mx-auto'>
        {/* Section Heading */}
        <div className='text-center container'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
            {subTitles && subTitles[0] ? subTitles[0] : ''}
          </h2>
          {/* <p className='mt-4 text-gray-600'>
            {descriptions && descriptions[0]
              ? stripHtml(descriptions[0])
              : 'Experience a harmonious blend of vibrant flavors and serene mountain views at Koti Resort Shimla, a member of Radisson Individuals Retreats. For a quiet family meal, a romantic dinner, or a fun gathering with friends, The Barn restaurant offers a vibrant dining experience showcasing local cuisine and popular dishes from around the country.'}
          </p> */}
          {subTitles && subTitles[1] && descriptions && descriptions[1] ? (
            <>
              {/* <p className='mt-4 text-gray-600'>{stripHtml(descriptions[1])}</p> */}
              <div className='mt-2 flex justify-center items-center'>
                <span className='h-[2px] w-16 bg-gray-400'></span>
                <span className='mx-2 text-gray-500 text-lg'>✿</span>
                <span className='h-[2px] w-16 bg-gray-400'></span>
              </div>
            </>
          ) : (
            <>
              {/* <p className='mt-4 text-gray-600'>
                Offering a comfortable, English-inspired setting and a
                refreshing selection of drinks, The Big Dipper Bar is perfect
                for cozying up by the fire and unwinding after a long day of
                work or sightseeing.
              </p> */}
              <div className='mt-2 flex justify-center items-center'>
                <span className='h-[2px] w-16 bg-gray-400'></span>
                <span className='mx-2 text-gray-500 text-lg'>✿</span>
                <span className='h-[2px] w-16 bg-gray-400'></span>
              </div>
            </>
          )}
        </div>

        {/* Offer Items */}
        {isDataLoading ? (
          <div className='text-center text-gray-600 container px-4 sm:px-6 md:px-12 lg:px-20'>
            Loading offers...
          </div>
        ) : offerData.length === 0 ? (
          <div className='text-center text-gray-600 container px-4 sm:px-6 md:px-12 lg:px-20'>
            No offers available.
          </div>
        ) : (
          offerData.map((item, index) => (
            <div
              key={item.id}
              className={`${
                index % 2 === 1 ? 'pattern md:py-20 py-10' : ''
              } mt-10 md:mt-20`}
            >
              <div className='container px-4 sm:px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-20 items-center'>
                {/* Text Content */}
                <div
                  className={`col-span-5 md:col-span-2 ${
                    index % 2 === 0 ? 'md:order-last' : 'md:order-first'
                  }`}
                >
                  {item.sub_title && (
                    <div className='text-xs mb-4 bg-yellow-600 flex items-center justify-center w-28 h-8 rounded-full text-white font-semibold'>
                      <p>{item.sub_title}</p>
                    </div>
                  )}
                  <h2 className='text-2xl font-semibold text-gray-900'>
                    {item.title}
                  </h2>
                  <div
                    className='mt-4 text-gray-600 break-words'
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  {item.feature_1 && (
                    <>
                      <div className='mt-4 text-gray-600'>Inclusions:</div>
                      <div className='grid grid-cols-1 text-md mt-2 text-gray-500'>
                        <span>{item.feature_1}</span>
                      </div>
                    </>
                  )}
                  {item.feature_2 && (
                    <>
                      <div className='mt-4 text-gray-600'>Exclusions:</div>
                      <div className='grid grid-cols-1 text-md mt-2 text-gray-500'>
                        <span>{item.feature_2}</span>
                      </div>
                    </>
                  )}
                  <div className='flex flex-row gap-4 mt-10'>
                    {item.is_enquire === 0 ? (
                      <button
                        onClick={openDrawer}
                        className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
                      >
                        {item.btn_text}
                      </button>
                    ) : (
                      <Link
                        href={item.btn_link}
                        className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
                      >
                        {item.btn_text}
                      </Link>
                    )}
                    {item.has_btn2 === 1 &&
                      (item.is_enquire2 === 0 ? (
                        <button
                          onClick={openDrawer}
                          className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
                        >
                          {item.btn2_text}
                        </button>
                      ) : (
                        <Link
                          href={item.btn2_link}
                          className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
                        >
                          {item.btn2_text}
                        </Link>
                      ))}
                  </div>
                </div>
                {/* Image */}
                <div
                  className={`relative col-span-5 md:col-span-3 ${
                    index % 2 === 0 ? 'md:order-first' : 'md:order-last'
                  }`}
                >
                  <div className='absolute -top-3 -left-3 w-[30%] h-[50%] border-t-[12px] border-l-[12px] border-yellow-800'></div>
                  <div className='relative z-10 shadow-lg overflow-hidden'>
                    {item.images.length > 1 ? (
                      <ImageSlider
                        images={item.images}
                        className='w-full h-[480px] object-cover'
                      />
                    ) : (
                      <Image
                        src={item.images[0]}
                        alt={item.imageAlt}
                        width={1000}
                        height={600}
                        className='border-8 shadow-xl w-full h-[240px] md:h-[480px] object-cover'
                        priority={index === 0}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

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
