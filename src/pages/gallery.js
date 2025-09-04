import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import GallaryBanner from '@/components/GallaryBanner';
const GalleryGrid = dynamic(() => import('@/components/GallaryGrid'), {
  ssr: false,
});
import NavbarHero from '@/components/NavbarHero';
import React from 'react';
import Head from 'next/head';

function Gallary() {
  return (
    <div>
      <Head>
        <title>Explore our Gallery-Gaj Retreat</title>
        <meta name='description' content='Explore our Gallery-Gaj Retreat' />
        <meta name='robots' content='index, follow' />

        {/* Open Graph Tags */}
        <meta property='og:title' content='Explore our Gallery-Gaj Retreat' />
        <meta
          property='og:description'
          content='Explore our Gallery-Gaj Retreat'
        />
        <meta property='og:image' content='/assets/img/slider.jpg' />
        <meta property='og:url' content='https://www.gajretreat.com/gallery' />
        <meta property='og:type' content='website' />

        {/* Twitter Card Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Explore our Gallery-Gaj Retreat' />
        <meta
          name='twitter:description'
          content='Explore our Gallery-Gaj Retreat'
        />
        <meta name='twitter:image' content='/assets/img/slider.jpg' />
      </Head>
      <NavbarHero />
      <GallaryBanner />
      <GalleryGrid />
      <Footer />
    </div>
  );
}

export default Gallary;
