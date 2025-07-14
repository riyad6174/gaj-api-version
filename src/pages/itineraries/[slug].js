'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import NavbarHero from '@/components/NavbarHero';
import Footer from '@/components/Footer';
import { baseUrl } from '@/utils/network';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function SignatureItineraryDetail() {
  const router = useRouter();
  const { slug } = router.query; // Get slug from URL
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // Fetch itinerary data
  useEffect(() => {
    if (!slug) return;

    const fetchItinerary = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/frontend/data/signature-itinerary-child/data/show-by-slug?slug=${encodeURIComponent(
            slug
          )}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
          setItinerary(data.data);
        } else {
          setError(data.message || 'Signature itinerary not found.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [slug]);

  // Form handling
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
        body: JSON.stringify({ ...formData, sheetName: 'Signature' }),
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

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>{error || 'Signature itinerary not found.'}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{itinerary.meta_title}</title>
        <meta
          name='description'
          content={
            itinerary.meta_description ||
            itinerary.subtitle ||
            'Explore this signature itinerary with Himalayan adventures, spiritual journeys, and cultural tours.'
          }
        />
        <meta name='robots' content='index, follow' />
        <meta property='og:title' content={itinerary.title} />
        <meta
          property='og:description'
          content={
            itinerary.meta_description ||
            itinerary.subtitle ||
            'Explore this signature itinerary with Himalayan adventures, spiritual journeys, and cultural tours.'
          }
        />
        <meta
          property='og:image'
          content={itinerary.image_path || '/assets/img/slider.jpg'}
        />
        <meta
          property='og:url'
          content={`https://www.gajretreat.com/signature-itineraries/${itinerary.slug}`}
        />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={itinerary.title} />
        <meta
          name='twitter:description'
          content={
            itinerary.meta_description ||
            itinerary.subtitle ||
            'Explore this signature itinerary with Himalayan adventures, spiritual journeys, and cultural tours.'
          }
        />
        <meta
          name='twitter:image'
          content={itinerary.image_path || '/assets/img/slider.jpg'}
        />
      </Head>
      <NavbarHero />
      <div className='relative mb-8'>
        <Image
          src={itinerary.image_path || 'https://via.placeholder.com/1000x600'}
          alt={itinerary.image_alt_text || itinerary.title}
          width={1000}
          height={600}
          className='object-cover w-full h-[600px]'
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 py-10'>
        <section className='col-span-3 md:col-span-3 container'>
          {/* Blog Title and Subtitle */}
          <div className='text-left mb-10'>
            <h1 className='text-3xl md:text-4xl font-bold text-center text-gray-900'>
              {itinerary.title}
            </h1>
            {itinerary.subtitle && (
              <p className='mt-2 text-gray-600 font-semibold text-center'>
                {itinerary.subtitle}
              </p>
            )}
            {/* Enquire Now Button (Before Description) */}
            <div className='mt-6 text-center'>
              <button
                onClick={openDrawer}
                className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
              >
                Enquire Now
              </button>
            </div>
          </div>

          {/* Blog Content */}
          <div
            className='blog-content text-justify break-words'
            dangerouslySetInnerHTML={{ __html: itinerary.description }}
          />

          {/* Enquire Now Button (After Description) */}
          <div className='mt-10 text-center'>
            <button
              onClick={openDrawer}
              className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
            >
              Enquire Now
            </button>
          </div>
        </section>
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
                    alt='Gaj Retreats logo'
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

      <Footer />
    </>
  );
}
