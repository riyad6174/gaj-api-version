'use client';
import { useState, useEffect } from 'react';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import OfferBanner from '@/components/OfferBanner';
import OfferSection from '@/components/OfferSection';
import Head from 'next/head';
import { baseUrl } from '../utils/network';

function Dining() {
  const [seoData, setSeoData] = useState({
    // meta_title: 'Get The Best Shimla Hotel Deals With Gaj Retreat',
    // meta_description:
    //   'Find a fantastic deal on your next hotel stay in Shimla, India with Gaj Retreats. A member of Radisson Individuals Retreats.',
    // image: '',
    // title: 'Offers',
    // sub_titles: ['title1', 'title2'],
    // descriptions: ['description1', 'description2'],
  });

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/frontend/data/page-details/offers`
        );
        const result = await response.json();
        if (result.success && result.data) {
          setSeoData({
            meta_title:
              result.data.meta_title ||
              'Get The Best Shimla Hotel Deals With Gaj Retreat',
            meta_description:
              result.data.meta_description ||
              'Find a fantastic deal on your next hotel stay in Shimla, India with Gaj Retreats. A member of Radisson Individuals Retreats.',
            image: result.data.image_path,
            title: result.data.title || 'Offers',
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
          content='Shimla hotel deals, Gaj Retreats, Radisson Individuals, hotel offers Shimla'
        />

        {/* Open Graph Tags */}
        <meta property='og:title' content={seoData.meta_title} />
        <meta property='og:description' content={seoData.meta_description} />
        <meta property='og:image' content={seoData.image} />
        <meta property='og:url' content='https://www.gajretreat.com/offers' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Gaj Retreats' />

        {/* Twitter Card Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={seoData.meta_title} />
        <meta name='twitter:description' content={seoData.meta_description} />
        <meta name='twitter:image' content={seoData.image} />
      </Head>
      <NavbarHero />
      <OfferBanner title={seoData.title} bannerImage={seoData.image} />
      <OfferSection
        subTitles={seoData.sub_titles}
        descriptions={seoData.descriptions}
      />
      <BookingSection />
      <Footer />
    </div>
  );
}

export default Dining;
