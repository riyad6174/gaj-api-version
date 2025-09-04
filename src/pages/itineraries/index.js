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
          Signature Travel Itineraries at Gaj Retreat | Himalayan Adventures &
          Cultural Journeys
        </title>
        <meta
          name='description'
          content='Embark on curated journeys with Gaj Retreat. Explore Himalayan Horse Safaris, British Raj heritage, spiritual retreats, and cultural tours. Tailored experiences await you.'
        />
        <meta name='robots' content='index, follow' />
        {/* Open Graph Tags */}
        <meta
          property='og:title'
          content='Signature Travel Itineraries at Gaj Retreat | Himalayan Adventures & Cultural Journeys'
        />
        <meta
          property='og:description'
          content='Embark on curated journeys with Gaj Retreat. Explore Himalayan Horse Safaris, British Raj heritage, spiritual retreats, and cultural tours. Tailored experiences await you.'
        />
        <meta property='og:image' content='/assets/img/slider.jpg' />
        <meta
          property='og:url'
          content='https://www.gajretreat.com/itineraries'
        />
        <meta property='og:type' content='website' />
        {/* Twitter Card Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='Signature Travel Itineraries at Gaj Retreat | Himalayan Adventures & Cultural Journeys'
        />
        <meta
          name='twitter:description'
          content='Embark on curated journeys with Gaj Retreat. Explore Himalayan Horse Safaris, British Raj heritage, spiritual retreats, and cultural tours. Tailored experiences await you.'
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
