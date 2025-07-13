'use client';

import BlogBanner from '@/components/BlogBanner';
import BlogSection from '@/components/BlogSection';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import Head from 'next/head';
import { baseUrl } from '../../utils/network';
import { useEffect, useState } from 'react';

export default function Blogs() {
  const [seoData, setSeoData] = useState({
    meta_title: '',
    meta_description: '',
    image: '', // Fallback image
    title: '',
    sub_titles: [],
    descriptions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${baseUrl}/frontend/data/page-details/blog`,
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
        if (result.success && result.data) {
          setSeoData({
            meta_title:
              result.data.meta_title || 'Luxury Stay in Himachal Pradesh',
            meta_description:
              result.data.meta_description ||
              'Enjoy a luxury stay at Gaj Retreats, Shimla, Himachal Pradesh. Relax in comfortable rooms with stunning views, perfect for getaways.',
            image:
              result.data.image_path || 'https://gaj.pritom.me/upload/file.png',
            title: result.data.title || 'Accommodations',
            sub_titles: result.data.sub_title || [],
            descriptions: result.data.description || [],
          });
        } else {
          throw new Error(result.message || 'No SEO data found');
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
        setError('Failed to load page data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeoData();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col'>
        <Head>
          <title>Loading | Gaj Retreat</title>
          <meta
            name='description'
            content='Loading blog page content for Gaj Retreat.'
          />
          <meta name='robots' content='noindex, nofollow' />
          <meta property='og:title' content='Loading | Gaj Retreat' />
          <meta
            property='og:description'
            content='Loading blog page content for Gaj Retreat.'
          />
          <meta
            property='og:image'
            content='https://gaj.pritom.me/upload/file.png'
          />
          <meta property='og:url' content='https://gajretreat.com/blog' />
          <meta property='og:type' content='website' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Loading | Gaj Retreat' />
          <meta
            name='twitter:description'
            content='Loading blog page content for Gaj Retreat.'
          />
          <meta
            name='twitter:image'
            content='https://gaj.pritom.me/upload/file.png'
          />
        </Head>
        <NavbarHero />
        <div className='flex-grow flex items-center justify-center'>
          <div className='text-center'>
            <p className='text-lg font-semibold dark:text-white'>Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col'>
        <Head>
          <title>Error | Gaj Retreat</title>
          <meta
            name='description'
            content='An error occurred while loading the blog page.'
          />
          <meta name='robots' content='noindex, nofollow' />
          <meta property='og:title' content='Error | Gaj Retreat' />
          <meta
            property='og:description'
            content='An error occurred while loading the blog page.'
          />
          <meta
            property='og:image'
            content='https://gaj.pritom.me/upload/file.png'
          />
          <meta property='og:url' content='https://gajretreat.com/blog' />
          <meta property='og:type' content='website' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Error | Gaj Retreat' />
          <meta
            name='twitter:description'
            content='An error occurred while loading the blog page.'
          />
          <meta
            name='twitter:image'
            content='https://gaj.pritom.me/upload/file.png'
          />
        </Head>
        <NavbarHero />
        <div className='flex-grow flex items-center justify-center'>
          <div className='text-center p-6'>
            <h1 className='text-3xl font-bold text-red-500 mb-4'>Error</h1>
            <p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
              {error}
            </p>
            <button
              onClick={() => (window.location.href = '/')}
              className='bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition'
            >
              Go to Homepage
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Head>
        <title>{seoData.meta_title}</title>
        <meta name='description' content={seoData.meta_description} />
        <meta name='robots' content='index, follow' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta charSet='UTF-8' />
        <meta
          name='keywords'
          content='luxury stay Shimla, Gaj Retreats, Himachal Pradesh accommodations, comfortable rooms, mountain getaways'
        />
        <meta property='og:title' content={seoData.meta_title} />
        <meta property='og:description' content={seoData.meta_description} />
        <meta property='og:image' content={seoData.image} />
        <meta property='og:url' content='https://gajretreat.com/blog' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Gaj Retreats' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={seoData.meta_title} />
        <meta name='twitter:description' content={seoData.meta_description} />
        <meta name='twitter:image' content={seoData.image} />
      </Head>
      <NavbarHero />
      <BlogBanner title={seoData.title} bannerImage={seoData.image} />
      <BlogSection />
      <BookingSection />
      <Footer />
    </div>
  );
}
