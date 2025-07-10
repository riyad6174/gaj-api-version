'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'react-phone-input-2/lib/style.css';
import { baseUrl } from '../utils/network';

// Dynamically import PhoneInput to avoid SSR issues
const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false });

function FloatingEnquireButton() {
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
      formDataPayload.append('section', 'Floating Enquiry');

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

  return (
    <div>
      <button
        onClick={openDrawer}
        className='fixed -right-12 top-1/3 transform -translate-y-1/2 rotate-[270deg] bg-[#553f26] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider shadow-lg hover:bg-[#814b05] transition z-50'
      >
        Enquire Now!
      </button>
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
    </div>
  );
}

export default FloatingEnquireButton;
