'use client';
import { useState, useEffect } from 'react';
import AccommodationSection from '@/components/AccommodationSection';
import AccommodationBanner from '@/components/AccomodationBanner';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import Head from 'next/head';
import { baseUrl } from '../utils/network';

function Accommodation() {
  const [seoData, setSeoData] = useState({
    // meta_title: 'Luxury Stay in Himachal Pradesh',
    // meta_description:
    //   'Enjoy a luxury stay at Gaj Retreats, Shimla, Himachal Pradesh. Relax in comfortable rooms with stunning views, perfect for getaways.',
    // image: '',
    // title: 'Accommodations',
    // sub_titles: ['title1', 'title2'],
    // descriptions: ['description1', 'description2'],
  });
  //
  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/frontend/data/page-details/accommodations`
        );
        const result = await response.json();
        if (result.success && result.data) {
          setSeoData({
            meta_title:
              result.data.meta_title || 'Luxury Stay in Himachal Pradesh',
            meta_description:
              result.data.meta_description ||
              'Enjoy a luxury stay at Gaj Retreats, Shimla, Himachal Pradesh. Relax in comfortable rooms with stunning views, perfect for getaways.',
            image: result.data.image_path,
            title: result.data.title || 'Accommodations',
            sub_titles: result.data.sub_title || ['title1', 'title2'],
            descriptions: result.data.description || [
              'description1',
              'description2',
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
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
          content='luxury stay Shimla, Gaj Retreats, Himachal Pradesh accommodations, comfortable rooms, mountain getaways'
        />

        {/* Open Graph Tags */}
        <meta property='og:title' content={seoData.meta_title} />
        <meta property='og:description' content={seoData.meta_description} />
        <meta property='og:image' content={seoData.image} />
        <meta
          property='og:url'
          content='https://gajretreat.com/accommodations'
        />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Gaj Retreats' />

        {/* Twitter Card Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={seoData.meta_title} />
        <meta name='twitter:description' content={seoData.meta_description} />
        <meta name='twitter:image' content={seoData.image} />
      </Head>
      <NavbarHero />
      <AccommodationBanner title={seoData.title} bannerImage={seoData.image} />
      <AccommodationSection
        subTitles={seoData.sub_titles}
        descriptions={seoData.descriptions}
      />
      <BookingSection />
      <Footer />
    </div>
  );
}

export default Accommodation;
