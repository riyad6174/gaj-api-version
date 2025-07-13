'use client';

import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import { baseUrl } from '@/utils/network';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';

export default function TestimonialsGrid() {
  const [testimonials, setTestimonials] = useState([]);
  const [seoData, setSeoData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/frontend/data/testimonial-list`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }

        const result = await response.json();
        const sortedTestimonials = result.data.data.sort(
          (a, b) => parseInt(b.priority) - parseInt(a.priority)
        );

        const formattedTestimonials = sortedTestimonials.map(
          (testimonial, index) => {
            // Logic to assign sizes for alternating 2-card and 3-card rows
            let size;
            const rowIndex = Math.floor(index / 5); // Group by sets of 5 testimonials
            if (rowIndex % 2 === 0) {
              // 2-card row: both cards are md:col-span-2
              size = 'col-span-3 md:col-span-1';
            } else {
              // 3-card row: first two are md:col-span-1, third is md:col-span-2, repeat
              size =
                index % 3 === 2
                  ? 'col-span-3 md:col-span-2'
                  : 'col-span-3 md:col-span-1';
            }

            return {
              name: testimonial.name,
              context: testimonial.sub_title,
              text: testimonial.description,
              size,
              rating: parseInt(testimonial.rate),
              image: testimonial.image_path,
            };
          }
        );

        setTestimonials(formattedTestimonials);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchSeoData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/frontend/data/page-details/testimonials`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch SEO data');
        }

        const result = await response.json();
        setSeoData({
          title: result.data.title,
          metaTitle: result.data.meta_title,
          metaDescription: result.data.meta_description,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchTestimonials(), fetchSeoData()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>{seoData.metaTitle}</title>
        <meta name='description' content={seoData.metaDescription} />
        <meta name='robots' content='index, follow' />
        <meta property='og:title' content={seoData.metaTitle} />
        <meta property='og:description' content={seoData.metaDescription} />
        <meta property='og:image' content='/assets/img/slider.jpg' />
        <meta property='og:url' content='https://gajretreat.com/dining' />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={seoData.metaTitle} />
        <meta name='twitter:description' content={seoData.metaDescription} />
        <meta name='twitter:image' content='/assets/img/slider.jpg' />
      </Head>
      <NavbarHero />
      <section className='pt-20 pb-20 bg-gray-50'>
        <div className='container mx-auto px-6 md:px-6 lg:px-10'>
          <div className='text-center'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mt-14'>
              {seoData.title}
            </h1>
            <div className='mt-2 flex justify-center items-center'>
              <span className='h-[2px] w-16 bg-gray-400'></span>
              <span className='mx-2 text-gray-500 text-lg'>✿</span>
              <span className='h-[2px] w-16 bg-gray-400'></span>
            </div>
          </div>

          {loading && (
            <div className='text-center py-10'>
              <p>Loading testimonials...</p>
            </div>
          )}

          {error && (
            <div className='text-center py-10 text-red-500'>
              <p>Error: {error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-10'>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow-md ${testimonial.size} flex flex-col`}
                >
                  <div className='flex items-center space-x-4 mb-4'>
                    <div className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold text-lg'>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className='text-gray-900 font-semibold'>
                        {testimonial.name}
                      </h4>
                      <div className='flex mt-1'>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className='text-yellow-500 text-lg'>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className='text-sm font-semibold mb-3'>
                    {testimonial.context}
                  </p>
                  <div
                    className='text-gray-600 text-sm max-h-40 overflow-y-auto'
                    dangerouslySetInnerHTML={{ __html: testimonial.text }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
