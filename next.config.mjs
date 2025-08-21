/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.gajretreat.com', 'www.api.gajretreat.com'],
  },
  async redirects() {
    return [
      // Static redirects
      {
        source: '/itineraries/himachal-villages',
        destination: '/itineraries/himachal-village',
        permanent: true,
      },
      {
        source: '/itineraries/himalayan-vista',
        destination:
          '/itineraries/himalayan-vista-11day-delhileh-ladakh-road-trip-via-manali',
        permanent: true,
      },
      {
        source: '/himachal-village',
        destination: '/itineraries/himachal-village',
        permanent: true,
      },
      {
        source: '/tarrif/villa-suite',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/punjab-horse-safari-2',
        destination: '/itineraries/punjab-horse-safari',
        permanent: true,
      },
      {
        source: '/gallery-old',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/villa-suites-at-gaj-retreat-the-perfect-romantic-escape',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home-slider/induldge-in-2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pay-online',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/home-slider/exploring-wilderness-on-horseback-is-absolutely-exhilarating',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pay-online-old',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/wp-content/uploads/2020/07/Safety-and-Hygine-1_compressed.pdf',
        destination: '/',
        permanent: true,
      },
      {
        source: '/activities/obstacle-course',
        destination: '/',
        permanent: true,
      },
      {
        source: '/new_page_for_test',
        destination: '/',
        permanent: true,
      },
      {
        source: '/little-tibet-2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/testimonial/atul-oberoi',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/wp-content/uploads/2020/06/Gaj-Signature-Experiences-Book.pdf',
        destination: '/',
        permanent: true,
      },
      {
        source: '/event_video/videos',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home-slider/an-unhinibited-celebration-of',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home-slider/explore-your',
        destination: '/',
        permanent: true,
      },
      {
        source: '/testimonial/dr-garima-jain',
        destination: '/',
        permanent: true,
      },
      {
        source: '/events/weddings/wedding-slider-0004',
        destination: '/',
        permanent: true,
      },
      {
        source: '/Activitie-Type/activities',
        destination: '/',
        permanent: true,
      },
      // Dynamic redirects for /blog/[slug] and /itineraries/[slug]
      {
        source: '/blog/[slug]',
        destination: '/',
        permanent: true,
      },
      {
        source: '/itineraries/[slug]',
        destination: '/', // Preserve valid itinerary slugs
        permanent: true,
      },
      // Redirect for /events/corporate-events
      {
        source: '/events/corporate-events',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
