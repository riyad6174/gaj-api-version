'use client';

import { useState } from 'react';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'react-phone-input-2/lib/style.css';
import { baseUrl } from '../utils/network';

// Dynamically import PhoneInput to avoid SSR issues
const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false });

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  // Handle form input changes & clear errors on typing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove the error message when the user starts typing again
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  // Handle phone input changes
  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
    setErrors((prev) => ({
      ...prev,
      phone: '',
    }));
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
    setErrorMessage('');
    setIsSubmitted(false);

    try {
      // First API call: Submit to spreadsheet
      const spreadsheetResponse = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submissionTime: new Date().toLocaleString(),
          sheetName: 'Contact',
        }),
      });

      // Second API call: Submit to /frontend/data/save-contact
      const formDataPayload = new FormData();
      formDataPayload.append('name', formData.name);
      formDataPayload.append('phone', formData.phone);
      formDataPayload.append('email', formData.email);
      formDataPayload.append('message', formData.message);
      formDataPayload.append('page', 'Contact');
      formDataPayload.append('section', 'General Contact');

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
        setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
      } else {
        setErrorMessage('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form data:', error.message);
      setErrorMessage('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <section className='py-8 md:py-16 bg-white'>
      <div className='container mx-auto px-6 md:px-12 lg:px-20'>
        <div className='text-center mb-8 md:mb-12'>
          <h2 className='text-3xl font-bold'>General Contact</h2>
          <p className='mt-4 text-gray-600'>
            Your valuable reviews help us enhance your experience and serve you
            better. Whether you have feedback or any queries, our dedicated
            support team is always ready to assist you.
          </p>
        </div>

        <div className='flex flex-col md:flex-row items-center justify-center space-x-4 mb-8 gap-10'>
          <div className='flex flex-col items-center justify-center space-x-4 mb-8'>
            <div className='flex font-bold items-center space-x-2 border-b border-gray-200'>
              General Contact
            </div>
            <div className='flex items-center space-x-2'>
              <Phone className='text-gray-600' size={20} />
              <span className='text-gray-700'>
                <a href='tel:+91 81469 93104'>+91 81469 93104</a>
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <Mail className='text-gray-600' size={20} />
              <span className='text-gray-700'>
                <a href='mailto:info.gajresort@radissonindividuals.com'>
                  info.gajresort@radissonindividuals.com
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 md:p-6'>
          {/* Google Map */}
          <div className='w-full flex items-center justify-center'>
            <iframe
              className='w-full h-[500px] md:h-[90%]'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3409.4898428057754!2d76.28650157427472!3d31.29020375847997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ac866807ecf2f%3A0xb423038433076203!2sGaj%20Retreat!5e0!3m2!1sen!2sbd!4v1745850983937!5m2!1sen!2sbd'
              allowFullScreen=''
              loading='lazy'
            ></iframe>
          </div>
          {/* Contact Form */}
          <div className='bg-white p-10 shadow-2xl border border-gray-100'>
            <h3 className='text-2xl font-bold text-gray-900'>
              Send Us A Message
            </h3>
            <p className='mt-2 text-gray-600'>
              If you need to get in touch with us, we would be happy to hear
              from you! Use the form below.
            </p>

            <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
              <div>
                <label className='block text-gray-700'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-800'
                />
                {errors.name && (
                  <span className='text-red-500 text-sm'>{errors.name}</span>
                )}
              </div>

              <div>
                <label className='block text-gray-700'>Phone Number</label>
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
                    padding: '0.5rem 2.5rem 0.5rem 3rem',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.375rem',
                    outline: 'none',
                    height: '2.5rem',
                    fontSize: '1rem',
                  }}
                  buttonStyle={{
                    border: '1px solid #d1d5db',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.375rem 0 0 0.375rem',
                  }}
                  dropdownStyle={{
                    border: '1px solid #d1d5db',
                  }}
                  specialLabel={false}
                />
                {errors.phone && (
                  <span className='text-red-500 text-sm'>{errors.phone}</span>
                )}
              </div>

              <div>
                <label className='block text-gray-700'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-800'
                />
                {errors.email && (
                  <span className='text-red-500 text-sm'>{errors.email}</span>
                )}
              </div>

              <div>
                <label className='block text-gray-700'>Message</label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-800'
                ></textarea>
                {errors.message && (
                  <span className='text-red-500 text-sm'>{errors.message}</span>
                )}
              </div>

              <button
                type='submit'
                className='w-full mt-4 bg-[#9d5b07] text-white py-4 text-xs hover:bg-yellow-800 transition'
              >
                {isLoading ? 'SENDING.....' : 'SEND MY MESSAGE'}
              </button>

              {/* Success / Error Messages */}
              {isSubmitted && (
                <p className='mt-4 text-green-600 font-normal text-center'>
                  ✅ Your message has been sent successfully!
                </p>
              )}
              {errorMessage && (
                <p className='mt-4 text-red-600 font-semibold text-center'>
                  ❌ {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
