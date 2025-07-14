import AccommodationBanner from '@/components/AccomodationBanner';
import ContactSection from '@/components/ContactSection';
import ContactUsBanner from '@/components/ContactUsBanner';
import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import Head from 'next/head';
import React from 'react';

function Contact() {
  return (
    <div>
      <Head>
        <title>Contact Gaj retreat Travel Developer & Support Contact</title>
        <meta
          name='description'
          content='For bookings, feedback, and inquiries regarding Gaj Resort, a member of Radisson Individuals Retreats, please do not hesitate to contact us.'
        />
        <meta name='robots' content='index, follow' />

        {/* Open Graph Tags */}
        <meta
          property='og:title'
          content='Contact Gaj retreat Travel Developer & Support Contact'
        />
        <meta
          property='og:description'
          content='For bookings, feedback, and inquiries regarding Gaj Resort, a member of Radisson Individuals Retreats, please do not hesitate to contact us.'
        />
        <meta property='og:image' content='/assets/img/slider.jpg' />
        <meta
          property='og:url'
          content='https://www.gajretreat.com/contact-us'
        />
        <meta property='og:type' content='website' />

        {/* Twitter Card Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='Contact Gaj retreat Travel Developer & Support Contact'
        />
        <meta
          name='twitter:description'
          content='For bookings, feedback, and inquiries regarding Gaj Resort, a member of Radisson Individuals Retreats, please do not hesitate to contact us.'
        />
        <meta name='twitter:image' content='/assets/img/slider.jpg' />
      </Head>
      <NavbarHero />
      <ContactUsBanner />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Contact;
