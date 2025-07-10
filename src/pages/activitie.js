'use client';
import { useState, useEffect } from 'react';
import BookingSection from '@/components/BookingSection';
import ExperienceBanner from '@/components/ExperienceBanner';
import ExperienceSection from '@/components/ExperienceSection';
import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import Head from 'next/head';
import { baseUrl } from '../utils/network';

export default function Explore() {
  const [seoData, setSeoData] = useState({
    // meta_title:
    //   'Explore Gaj Retreats Experiences | Swimming Pool, Forest Retreats & Radisson Shimla',
    // meta_description:
    //   'Experience luxury and serenity at Gaj Retreats, a Radisson Retreat in Naldehra. Enjoy a swimming pool, forest resorts near Shimla, and exceptional hospitality.',
    // image: '',
    // title: 'Experiences',
    // sub_titles: ['title1', 'title2'],
    // descriptions: ['description1', 'description2'],
  });

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const apiUrl = `${baseUrl}/frontend/data/page-details/explore`;
        const response = await fetch(apiUrl);

        // Check if response is OK and content type is JSON
        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`
          );
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(
            `Expected JSON, but received: ${text.slice(0, 50)}...`
          );
        }

        const result = await response.json();
        if (result.success && result.data) {
          setSeoData({
            meta_title: result.data.meta_title,
            meta_description: result.data.meta_description,
            image: result.data.image_path,
            title: result.data.title,
            sub_titles: result.data.sub_title || ['title1', 'title2'],
            descriptions: result.data.description || [
              'description1',
              'description2',
            ],
          });
        } else {
          console.warn('API response unsuccessful or no data:', result);
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error.message);
        // console.error('API URL:', apiUrl);
        console.error('Error details:', error);
      }
    };

    fetchSeoData();
  }, []);

  return (
    <div>
      <Head>
        <title>{seoData.meta_title}</title>
        <meta name='description' content={seoData.meta_description} />
        <meta name='robots' content='index, follow' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta charSet='UTF-8' />
        <meta
          name='keywords'
          content=' swimming pool Shimla, forest retreats Naldehra, Radisson Shimla, luxury hospitality'
        />

        {/* Open Graph Tags */}
        <meta property='og:title' content={seoData.meta_title} />
        <meta property='og:description' content={seoData.meta_description} />
        <meta property='og:image' content={seoData.image} />
        <meta property='og:url' content='https://gajretreat.com/explore' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Gaj Retreats' />

        {/* Twitter Card Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={seoData.meta_title} />
        <meta name='twitter:description' content={seoData.meta_description} />
        <meta name='twitter:image' content={seoData.image} />
      </Head>
      <NavbarHero />
      <ExperienceBanner title={seoData.title} bannerImage={seoData.image} />
      <ExperienceSection
        subTitles={seoData.sub_titles}
        descriptions={seoData.descriptions}
      />
      <BookingSection />
      <Footer />
    </div>
  );
}
