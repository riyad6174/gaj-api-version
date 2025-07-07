import About from '@/components/About';
import BookingSection from '@/components/BookingSection';
import EventsDiningSection from '@/components/EventDiningSection';
import FAQSection from '@/components/FaqSection';
import FloatingEnquireButton from '@/components/FloatingEnquireButton';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import HowToReach from '@/components/HowToReach';
import NavbarHero from '@/components/NavbarHero';
import ServicesSection from '@/components/ServiceSection';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Best Luxury Hotels & Resorts in Hoshiarpur, Punjab</title>
        <meta
          name='description'
          content='Stay at Gaj Retreat, a premier luxury hotel and resort in Punjab. Enjoy comfortable accommodation, corporate events, destination weddings, adventure trips, and more in the serene surroundings of Hoshiarpur.'
        />
        <meta name='robots' content='index, follow' />

        {/* Open Graph Tags */}
        <meta
          property='og:title'
          content='Best Luxury Hotels & Resorts in Hoshiarpur, Punjab'
        />
        <meta
          property='og:description'
          content='Stay at Gaj Retreat, a premier luxury hotel and resort in Punjab. Enjoy comfortable accommodation, corporate events, destination weddings, adventure trips, and more in the serene surroundings of Hoshiarpur.'
        />
        <meta property='og:image' content='/assets/img/slider.jpg' />
        <meta property='og:url' content='https://www.kotiresorts.com/dining' />
        <meta property='og:type' content='website' />

        {/* Twitter Card Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='Best Luxury Hotels & Resorts in Hoshiarpur, Punjab'
        />
        <meta
          name='twitter:description'
          content='Stay at Gaj Retreat, a premier luxury hotel and resort in Punjab. Enjoy comfortable accommodation, corporate events, destination weddings, adventure trips, and more in the serene surroundings of Hoshiarpur.'
        />
        <meta name='twitter:image' content='/assets/img/slider.jpg' />
      </Head>
      <NavbarHero />
      <HeroSection />
      <About />
      <ServicesSection />
      <EventsDiningSection />
      <HowToReach />
      <FAQSection />
      <BookingSection />
      <Footer />
      <FloatingEnquireButton />
    </>
  );
}
