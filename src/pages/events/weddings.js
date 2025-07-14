'use client';
import { useState, useEffect } from 'react';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import WeddingBanner from '@/components/WeddingBanner';
import WeddingGallerySlider from '@/components/WeddingGallerySlider';
import WeddingSection from '@/components/WeddingSection';
import Head from 'next/head';
import { baseUrl } from '@/utils/network';

export default function WeddingEvents() {
  const [seoData, setSeoData] = useState({
    // meta_title:
    //   'Destination Wedding Hotel & Resort in Shimla, Himachal Pradesh',
    // meta_description:
    //   'The perfect destination wedding hotel and resort in Shimla, offering stunning venues and personalized services to ensure your wedding day is truly memorable. We ensure your wedding is a grand celebration amidst the beauty of Shimla.',
    // image: '',
    // title: 'Wedding Events',
    // sub_titles: ['title1', 'title2'],
    // descriptions: ['description1', 'description2'],
  });

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const apiUrl = `${baseUrl}/frontend/data/page-details/wedding-events`;
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
            sub_titles: result.data.sub_title,
            descriptions: result.data.description,
          });
        } else {
          console.warn('API response unsuccessful or no data:', result);
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error.message);
        console.error('API URL:', apiUrl);
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
          content='destination wedding Shimla, Gaj Retreat weddings, Himachal Pradesh wedding venues, wedding hotel Shimla, Radisson Individuals'
        />

        {/* Open Graph Tags */}
        <meta property='og:title' content={seoData.meta_title} />
        <meta property='og:description' content={seoData.meta_description} />
        <meta property='og:image' content={seoData.image} />
        <meta
          property='og:url'
          content='https://www.gajretreat.com/events/weddings'
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
      <WeddingBanner title={seoData.title} bannerImage={seoData.image} />
      <WeddingSection
        subTitles={seoData.sub_titles}
        descriptions={seoData.descriptions}
        short_description={seoData.short_description}
      />
      <WeddingGallerySlider />
      <BookingSection />
      <Footer />
    </div>
  );
}
