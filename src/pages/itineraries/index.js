import { useState, useEffect } from 'react';
import Head from 'next/head';
import NavbarHero from '@/components/NavbarHero';
import SignatureBanner from '@/components/SignatureBanner';
import SignatureSection from '@/components/SignatureSection';
import Footer from '@/components/Footer';
import { baseUrl } from '@/utils/network';

export default function SignatureItineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/frontend/data/signature-itinerary-child`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setItineraries(data.data.data || []);
        } else {
          setError(data.message || 'Failed to fetch signature itineraries.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  // Debug: Log itineraries to verify data
  console.log('Itineraries:', itineraries);

  return (
    <div>
      <Head>
        <title>
          Signature Itineraries - Himalayan Adventures, Spiritual Journeys, and
          British Raj Heritage
        </title>
        <meta
          name='description'
          content='Join us on signature itineraries featuring Himalayan Horse Safaris, British Raj nostalgia, spiritual journeys, and cultural tours. Visit ancient temples, heritage villages, and stunning landscapes for an unforgettable adventure.'
        />
        <meta name='robots' content='index, follow' />
        {/* Open Graph Tags */}
        <meta
          property='og:title'
          content='Signature Itineraries - Himalayan Adventures, Spiritual Journeys, and British Raj Heritage'
        />
        <meta
          property='og:description'
          content='Join us on signature itineraries featuring Himalayan Horse Safaris, British Raj nostalgia, spiritual journeys, and cultural tours. Visit ancient temples, heritage villages, and stunning landscapes for an unforgettable adventure.'
        />
        <meta property='og:image' content='/assets/img/slider.jpg' />
        <meta
          property='og:url'
          content='https://gajretreat.com/signature-itineraries'
        />
        <meta property='og:type' content='website' />
        {/* Twitter Card Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='Signature Itineraries - Himalayan Adventures, Spiritual Journeys, and British Raj Heritage'
        />
        <meta
          name='twitter:description'
          content='Join us on signature itineraries featuring Himalayan Horse Safaris, British Raj nostalgia, spiritual journeys, and cultural tours. Visit ancient temples, heritage villages, and stunning landscapes for an unforgettable adventure.'
        />
        <meta name='twitter:image' content='/assets/img/slider.jpg' />
      </Head>
      <NavbarHero />
      <SignatureBanner />
      <SignatureSection
        itineraries={itineraries}
        loading={loading}
        error={error}
      />
      <Footer />
    </div>
  );
}
