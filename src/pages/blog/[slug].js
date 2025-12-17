'use client';

import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import NavbarHero from '@/components/NavbarHero';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { baseUrl } from '@/utils/network';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import 'react-phone-input-2/lib/style.css';

// Dynamically import PhoneInput to avoid SSR issues
const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false });

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query; // Get slug from the URL
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
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
  const [currentOfferTitle, setCurrentOfferTitle] = useState(''); // Track the offer item title for section

  const specialSlug =
    'celebrate-new-year-2025-at-gaj-resort-a-member-of-radisson-individuals-retreats';
  const isSpecialSlug = slug === specialSlug;

  // Fetch blog details and related blogs
  useEffect(() => {
    if (!slug) return; // Wait for slug to be available

    const fetchBlog = async () => {
      try {
        // Fetch blog details
        const blogResponse = await fetch(
          `${baseUrl}/frontend/data/blog-details/${slug}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!blogResponse.ok) {
          throw new Error(`Failed to fetch blog: ${blogResponse.statusText}`);
        }

        const blogResult = await blogResponse.json();

        if (!blogResult.success) {
          throw new Error(blogResult.message || 'Failed to retrieve blog');
        }

        setBlog(blogResult.data);

        // Fetch related blogs
        const blogsResponse = await fetch(
          `${baseUrl}/frontend/data/blog-list`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!blogsResponse.ok) {
          throw new Error(
            `Failed to fetch related blogs: ${blogsResponse.statusText}`
          );
        }

        const blogsResult = await blogsResponse.json();

        if (!blogsResult.success) {
          throw new Error(
            blogsResult.message || 'Failed to retrieve related blogs'
          );
        }

        // Filter out the current blog from related blogs
        setRelatedBlogs(blogsResult.data.data.filter((b) => b.slug !== slug));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

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
    setCurrentOfferTitle('');
  };

  const openDrawer = (offerTitle) => {
    setCurrentOfferTitle(offerTitle);
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

    setIsLoadingForm(true);
    formData.submissionTime = new Date().toLocaleString();

    try {
      // First API call: Submit to spreadsheet
      const spreadsheetResponse = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, sheetName: 'Offers' }),
      });

      // Second API call: Submit to /frontend/data/save-contact
      const formDataPayload = new FormData();
      formDataPayload.append('name', formData.name);
      formDataPayload.append('phone', formData.phone);
      formDataPayload.append('email', formData.email);
      formDataPayload.append('message', formData.message);
      formDataPayload.append('page', 'Offers');
      formDataPayload.append('section', currentOfferTitle || 'General Enquiry');

      const contactResponse = await fetch(
        `${baseUrl}/frontend/data/save-contact`,
        {
          method: 'POST',
          body: formDataPayload,
        }
      );

      setIsLoadingForm(false);

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
      setIsLoadingForm(false);
      console.error('Error submitting form data:', error);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <>
        <NavbarHero />
        <div className='container h-screen mx-auto flex items-center justify-center text-center text-gray-200'>
          <div role='status'>
            <svg
              aria-hidden='true'
              className='inline w-8 h-8 text-gray-200 animate-spin fill-yellow-700'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Render error state
  if (error) {
    return (
      <>
        <Head>
          <title>Error | Gaj Retreat</title>
          <meta
            name='description'
            content='An error occurred while fetching the blog post.'
          />
          <meta name='robots' content='index, follow' />
          <meta property='og:title' content='Error | Gaj Retreat' />
          <meta
            property='og:description'
            content='An error occurred while fetching the blog post.'
          />
          <meta property='og:image' content='/assets/img/slider.jpg' />
          <meta
            property='og:url'
            content={`https://www.gajretreat.com/blog/${slug}`}
          />
          <meta property='og:type' content='website' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Error | Gaj Retreat' />
          <meta
            name='twitter:description'
            content='An error occurred while fetching the blog post.'
          />
          <meta name='twitter:image' content='/assets/img/slider.jpg' />
        </Head>
        <NavbarHero />
        <div className='container mx-auto py-30 text-center text-red-600'>
          Error: {error}
        </div>
        <Footer />
      </>
    );
  }

  // Render blog not found
  if (!blog) {
    return (
      <>
        <Head>
          <title>Blog Not Found | Gaj Retreat</title>
          <meta
            name='description'
            content='The requested blog post could not be found.'
          />
          <meta name='robots' content='noindex, nofollow' />
          <meta property='og:title' content='Blog Not Found | Gaj Retreat' />
          <meta
            property='og:description'
            content='The requested blog post could not be found.'
          />
          <meta property='og:image' content='/assets/img/slider.jpg' />
          <meta
            property='og:url'
            content={`https://www.gajretreat.com/blog/${slug}`}
          />
          <meta property='og:type' content='website' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Blog Not Found | Gaj Retreat' />
          <meta
            name='twitter:description'
            content='The requested blog post could not be found.'
          />
          <meta name='twitter:image' content='/assets/img/slider.jpg' />
        </Head>
        <NavbarHero />
        <div className='container mx-auto py-30 text-center text-gray-600'>
          Blog not found.
        </div>
        <Footer />
      </>
    );
  }

  // Format created_at date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Head>
        <title>{blog.meta_title}</title>
        <meta name='description' content={blog.meta_description} />
        <meta name='robots' content='index, follow' />
        <meta property='og:title' content={blog.meta_title} />
        <meta property='og:description' content={blog.meta_description} />
        <meta property='og:image' content={blog.image_path} />
        <meta
          property='og:url'
          content={`https://www.gajretreat.com/blog/${slug}`}
        />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={blog.meta_title} />
        <meta name='twitter:description' content={blog.meta_description} />
        <meta name='twitter:image' content={blog.image_path} />
      </Head>
      <NavbarHero />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 container py-30'>
        <section className='col-span-3 md:col-span-2'>
          {/* Blog Image */}
          <div className='relative mb-8'>
            <Image
              src={blog.image_path}
              alt={blog.image_alt_text || blog.title}
              width={1000}
              height={600}
              className='object-cover w-full h-[400px] rounded-lg shadow-md'
            />
          </div>

          {/* Blog Title and Date */}
          <div className='text-left mb-6'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>
              {blog.title}
            </h1>
            <p className='mt-2 text-gray-600'>{formatDate(blog.created_at)}</p>
          </div>

          {/* Blog Content */}
          <div
            className='blog-content text-justify break-words'
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          {/* Enquire Now Button for Special Slug */}
          {isSpecialSlug && (
            <div className='mt-8 text-center px-4'>
              <img
                src='/assets/offer/new-year.jpg'
                alt='New-year-offer'
                className='mx-auto my-4 w-full h-auto object-cover rounded-lg shadow-md'
              />
              <button
                onClick={() => openDrawer("New Year's Eve Extravaganza")}
                className='px-6 py-3 md:px-8 md:py-3 border-2 border-[#9d5b07] text-[#9d5b07] text-xs md:text-sm font-semibold hover:bg-[#9d5b07] hover:text-white transition w-full md:w-auto max-w-xs'
              >
                Enquire Now
              </button>
            </div>
          )}
        </section>

        {/* Related Blogs Section */}
        <section className='col-span-3 md:col-span-1 bg-white p-6 rounded-lg shadow-md sticky top-16'>
          <h3 className='text-xl font-semibold text-gray-900 mb-4'>
            Recent Blogs
          </h3>
          <div>
            {relatedBlogs.length === 0 ? (
              <p className='text-gray-600'>No related blogs available.</p>
            ) : (
              relatedBlogs.map((relatedBlog) => {
                // Ensure relatedBlog has a created_at field before formatting
                const formattedDate = relatedBlog.created_at
                  ? formatDate(relatedBlog.created_at)
                  : 'Date not available';

                return (
                  <div key={relatedBlog.slug} className='mb-6'>
                    <div className='flex items-center'>
                      <Image
                        src={relatedBlog.image_path}
                        alt={relatedBlog.image_alt_text || relatedBlog.title}
                        width={100}
                        height={100}
                        className='object-cover w-20 h-20 rounded-lg shadow-md'
                      />
                      <div className='ml-4'>
                        <Link href={`/blog/${relatedBlog.slug}`}>
                          <h4 className='text-lg font-semibold text-gray-800 hover:text-yellow-700 transition'>
                            {relatedBlog.title}
                          </h4>
                        </Link>
                        <p className='text-gray-600'>{formattedDate}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
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
              <DialogPanel className='w-full max-w-full  lg:max-w-md bg-gray-200 shadow-xl min-h-screen overflow-y-auto p-4 sm:p-6'>
                <DialogTitle className='text-lg  font-bold text-gray-900 px-6 '>
                  <img
                    src='/assets/img/logo.png'
                    alt='gaj logo'
                    className='w-44  mx-auto'
                  />
                  <p className='mt-2 text-gray-600 font-normal  md:text-sm text-[12px] text-center px-2 '>
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
                      <label className='block text-gray-700 text-sm '>
                        Name
                      </label>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className='w-full mt-1 px-3 py-1   border bg-white focus:outline-none focus:ring-2 focus:ring-yellow-800 text-sm sm:text-base'
                      />
                      {errors.name && (
                        <span className='text-red-500 text-xs sm:text-sm'>
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className='block text-gray-700 text-sm '>
                        Email
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className='w-full mt-1 px-3 py-1   border bg-white focus:outline-none focus:ring-2 focus:ring-yellow-800 text-sm sm:text-base'
                      />
                      {errors.email && (
                        <span className='text-red-500 text-xs sm:text-sm'>
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className='block text-gray-700 text-sm '>
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
                      <label className='block text-gray-700 text-sm '>
                        Message
                      </label>
                      <textarea
                        name='message'
                        rows={1}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className='w-full mt-1 px-3 py-1   border bg-white focus:outline-none focus:ring-2 focus:ring-yellow-800 text-sm sm:text-base'
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
                        className='w-full border border-gray-700 text-gray-800 py-1  hover:text-gray-100 hover:bg-yellow-800 transition text-sm sm:text-base'
                      >
                        {isLoadingForm ? 'Submitting...' : 'Submit'}
                      </button>
                      <button
                        type='button'
                        onClick={closeDrawer}
                        className='w-full border border-red-700 text-red-800 py-1  hover:text-gray-100 hover:bg-yellow-800 transition text-sm sm:text-base'
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
