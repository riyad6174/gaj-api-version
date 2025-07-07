import Link from 'next/link';

// Utility to strip HTML tags from description
const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').trim();
};

export default function SignatureSection({ itineraries, loading, error }) {
  return (
    <section className='py-8 md:py-16 bg-white'>
      <div className='container mx-auto px-6 md:px-12 lg:px-20'>
        <div className='text-center mb-8 md:mb-12'>
          <h2 className='text-3xl font-bold'>Signature Itineraries</h2>
          <p className='mt-4 text-gray-600'>
            Join us on signature itineraries featuring Himalayan Horse Safaris,
            British Raj nostalgia, spiritual journeys, and cultural tours. Visit
            ancient temples, heritage villages, and stunning landscapes for an
            unforgettable adventure.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className='text-center text-gray-600'>
            Loading itineraries...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className='text-center text-red-500'>Error: {error}</div>
        )}

        {/* Blog Grid Section */}
        {!loading && !error && itineraries.length === 0 && (
          <div className='text-center text-gray-600'>
            No signature itineraries found.
          </div>
        )}
        {!loading && !error && itineraries.length > 0 && (
          <section className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
            {itineraries.map((itinerary) => (
              <div
                key={itinerary.id}
                className='bg-white shadow-lg overflow-hidden flex flex-col'
              >
                {/* Image */}
                <div className='w-full h-60 relative'>
                  <img
                    src={
                      itinerary.image_path || 'https://via.placeholder.com/300'
                    }
                    alt={itinerary.image_alt_text || itinerary.title}
                    className='object-cover w-full h-full'
                  />
                </div>

                {/* Content */}
                <div className='p-4 flex flex-col flex-grow'>
                  {/* Title */}
                  <Link href={`/itineraries/${itinerary.slug}`}>
                    <h3 className='text-xl text-center font-semibold pb-4 text-yellow-800'>
                      {itinerary.title}
                    </h3>
                  </Link>

                  {/* Subtitle */}
                  <p className='text-gray-600 text-md py-1 mb-3 text-center mt-1 line-clamp-3'>
                    {itinerary.subtitle}
                  </p>

                  {/* Description Snippet */}
                  {/* <p className='text-gray-700 mt-4 flex-grow'>
                    {stripHtml(itinerary.description).slice(0, 100)}
                    {stripHtml(itinerary.description).length > 100 ? '...' : ''}
                  </p> */}

                  {/* Read More Button */}
                  <div className='flex justify-center items-center'>
                    <Link
                      href={`/itineraries/${itinerary.slug}`}
                      passHref
                      className='mt-4 bg-transparent border border-yellow-700 text-center text-yellow-700 py-2 px-6 rounded-xs hover:bg-yellow-800 hover:text-white transition self-start'
                    >
                      Read More...
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </section>
  );
}
