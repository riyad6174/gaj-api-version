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
import { baseUrl } from '../utils/network';

// Dynamically import PhoneInput to avoid SSR issues
const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false });
import 'react-phone-input-2/lib/style.css';

// getStaticProps for pre-fetching data at build time
export async function getStaticProps() {
  try {
    const res = await fetch(
      `${baseUrl}/frontend/data/page-data-list/wedding-events`
    );
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Expected JSON response from API');
    }

    const result = await res.json();

    if (!result.success || !result.data) {
      return { props: { weddingData: [] } };
    }

    return {
      props: {
        weddingData: result.data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          image:
            item.images[0]?.image_path || '/assets/wedding/placeholder.jpg',
          imageAlt: item.image_alt_text || item.title,
          btn_text: item.btn_text,
          btn_link: item.btn_link,
          is_enquire: item.is_enquire,
          has_btn2: item.has_btn2,
          btn2_text: item.btn2_text,
          btn2_link: item.btn2_link,
          is_enquire2: item.is_enquire2,
        })),
      },
      revalidate: 60, // Incremental Static Regeneration every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching wedding data in getStaticProps:', error);
    return { props: { weddingData: [] } };
  }
}

// Helper to strip HTML tags for plain text
const stripHtml = (html) => {
  if (!html) return '';
  if (typeof window === 'undefined') {
    // Server-side: Use regex to strip HTML
    return html.replace(/<[^>]+>/g, '');
  }
  // Client-side: Use DOMParser for more robust HTML stripping
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export default function WeddingSection({
  weddingData: initialData,
  subTitles,
  descriptions,
  short_description,
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
  const [weddingData, setWeddingData] = useState(initialData || []);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Client-side fallback for dynamic updates
  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      setIsDataLoading(true);

      fetch(`${baseUrl}/frontend/data/page-data-list/wedding-events`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `HTTP error! Status: ${res.status}, StatusText: ${res.statusText}`
            );
          }
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            return res.text().then((text) => {
              throw new Error(
                `Expected JSON, but received: ${text.slice(0, 50)}...`
              );
            });
          }
          return res.json();
        })
        .then((result) => {
          if (result.success && result.data) {
            setWeddingData(
              result.data.map((item) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                image:
                  item.images[0]?.image_path ||
                  '/assets/wedding/placeholder.jpg',
                imageAlt: item.image_alt_text || item.title,
                btn_text: item.btn_text,
                btn_link: item.btn_link,
                is_enquire: item.is_enquire,
                has_btn2: item.has_btn2,
                btn2_text: item.btn2_text,
                btn2_link: item.btn2_link,
                is_enquire2: item.is_enquire2,
              }))
            );
          }
        })
        .catch((error) => {
          console.error('Error fetching wedding data:', error.message);
          console.error(
            'API URL:',
            `${baseUrl}/frontend/data/page-data-list/wedding-events`
          );
          console.error('Error details:', error);
        })
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

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        body: JSON.stringify({ ...formData, sheetName: 'Weddings' }),
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
    <section className='py-10 md:py-24 bg-white'>
      <div className='mx-auto'>
        {/* Section Heading */}
        <div className='text-center container'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
            {subTitles && subTitles[0]
              ? subTitles[0]
              : 'Best Hotels for Destination Wedding in Shimla'}
          </h2>
          <p className='mt-4 text-gray-600'>
            {short_description && short_description
              ? short_description
              : 'Host an intimate Luxury Wedding Among the Sprawling Hills of Shimla'}
          </p>
          <p className='mt-4 text-gray-600'>
            {descriptions && descriptions[0]
              ? stripHtml(descriptions[0])
              : 'Host an intimate Luxury Wedding Among the Sprawling Hills of Shimla'}
          </p>
          <p className='mt-4 text-gray-600'>
            {descriptions && descriptions[1]
              ? stripHtml(descriptions[1])
              : 'Nestled in the lush green nature of Shimla, Koti Resort Shimla, a member of Radisson Individuals Retreats, provides the perfect setting for an intimate celebration surrounded by close friends and family. Enjoy elegant indoor venues and outdoor spaces and take advantage of our personalized decorations, catering options, and floral arrangements to bring your dream wedding to life.'}
          </p>
          {descriptions && descriptions[1] ? (
            <div className='mt-2 flex justify-center items-center'>
              <span className='h-[2px] w-16 bg-gray-400'></span>
              <span className='mx-2 text-gray-500 text-lg'>✿</span>
              <span className='h-[2px] w-16 bg-gray-400'></span>
            </div>
          ) : (
            <>
              <p className='mt-4 text-gray-600'>
                Treat your guests to a comfortable stay in our rooms and suites,
                curated experiences, and delightful dining for a celebration
                they won’t forget. Whether you’re planning a small indoor
                ceremony or a beautiful garden wedding, our expert team will
                take care of every detail so you can focus on creating magical
                memories that will last a lifetime.
              </p>
              <div className='mt-2 flex justify-center items-center'>
                <span className='h-[2px] w-16 bg-gray-400'></span>
                <span className='mx-2 text-gray-500 text-lg'>✿</span>
                <span className='h-[2px] w-16 bg-gray-400'></span>
              </div>
            </>
          )}
        </div>

        {/* Dynamic Wedding Sections */}
        <div className='mt-20'>
          {isDataLoading ? (
            <div className='text-center text-gray-600'>
              Loading wedding options...
            </div>
          ) : weddingData.length === 0 ? (
            <div className='text-center text-gray-600'>
              No wedding options available.
            </div>
          ) : (
            weddingData.map((item, index) => (
              <div
                key={item.id}
                className={`${
                  index % 2 === 1 ? 'pattern md:py-20 py-10' : ''
                } mt-10 md:mt-20`}
              >
                <div className='container grid grid-cols-1 md:grid-cols-5 gap-20 items-center'>
                  {/* Text Content */}
                  <div
                    className={`col-span-5 md:col-span-2 ${
                      index === 1 || index % 2 === 1
                        ? 'md:order-first'
                        : 'md:order-last'
                    }`}
                  >
                    <h2 className='text-2xl font-semibold text-gray-900'>
                      {item.title}
                    </h2>
                    <div
                      className='mt-4 text-gray-600 text-justify break-words'
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <div className='mt-10 flex space-x-4'>
                      {/* Primary Button */}
                      {item.is_enquire === 0 ? (
                        <button
                          onClick={openDrawer}
                          className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
                        >
                          {item.btn_text || 'Enquire Now'}
                        </button>
                      ) : (
                        <Link
                          href={item.btn_link || '#'}
                          className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
                        >
                          {item.btn_text || 'Read More'}
                        </Link>
                      )}
                      {/* Secondary Button */}
                      {item.has_btn2 === 1 &&
                        (item.is_enquire2 === 0 ? (
                          <button
                            onClick={openDrawer}
                            className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
                          >
                            {item.btn2_text || 'Enquire Now'}
                          </button>
                        ) : (
                          <Link
                            href={item.btn2_link || '#'}
                            className='px-8 py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs font-semibold hover:bg-[#9d5b07] hover:text-white transition'
                          >
                            {item.btn2_text || 'Read More'}
                          </Link>
                        ))}
                    </div>
                  </div>
                  {/* Image */}
                  <div
                    className={`relative col-span-5 md:col-span-3 ${
                      index === 1 || index % 2 === 1
                        ? 'md:order-last'
                        : 'md:order-first'
                    }`}
                  >
                    <div className='absolute -top-3 -left-3 w-[30%] h-[50%] border-t-[12px] border-l-[12px] border-yellow-800'></div>
                    <div className='relative z-10 shadow-lg overflow-hidden'>
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        width={1000}
                        height={600}
                        className='border-8 shadow-xl w-full h-[480px] object-cover'
                        priority={index === 0}
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
