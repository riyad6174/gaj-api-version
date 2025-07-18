import AboutBanner from '@/components/AboutBanner';
import AboutSection from '@/components/AboutSection';
import BookingSection from '@/components/BookingSection';
import CorporateEventSection from '@/components/CorporateEventSection';
import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import Head from 'next/head';
import React from 'react';

function accommodation() {
  return (
    <div>
      <Head>
        <title>About Gaj Retreat</title>
        <meta
          name='description'
          content=' Learn more about Gaj Retreat in Shimla, Himachal Pradesh.'
        />
        <meta name='robots' content='index, follow' />

        {/* Open Graph Tags */}
        <meta property='og:title' content='About Gaj Retreat' />
        <meta
          property='og:description'
          content=' Learn more about Gaj Retreat in Shimla, Himachal Pradesh.'
        />
        <meta property='og:image' content='/assets/img/slider.jpg' />
        <meta property='og:url' content='https://www.gajretreat.com/about-us' />
        <meta property='og:type' content='website' />

        {/* Twitter Card Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='About Gaj Retreat' />
        <meta
          name='twitter:description'
          content=' Learn more about Gaj Retreat in Shimla, Himachal Pradesh.'
        />
        <meta name='twitter:image' content='/assets/img/slider.jpg' />
      </Head>
      <NavbarHero />
      <AboutBanner />
      <AboutSection />
      <BookingSection />
      <Footer />
    </div>
  );
}

export default accommodation;
