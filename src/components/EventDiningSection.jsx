import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { baseUrl } from '../utils/network';

// getStaticProps for pre-fetching data at build time (SEO and performance optimization)
export async function getStaticProps() {
  try {
    const res = await fetch(`${baseUrl}/frontend/data/page-data-list/home`);
    const result = await res.json();

    if (!result.success || !result.data) {
      return { props: { sections: [] } };
    }

    return {
      props: {
        sections: result.data.data,
      },
      revalidate: 60, // Revalidate every 60 seconds for Incremental Static Regeneration (ISR)
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { sections: [] } };
  }
}

export default function EventsDiningSection({ sections }) {
  // Fallback state for client-side fetching (optional, for dynamic updates)
  const [data, setData] = useState(sections || []);
  const [isLoading, setIsLoading] = useState(false);

  // Optional: Client-side fetching if data needs to be refreshed without rebuilding
  useEffect(() => {
    if (!sections || sections.length === 0) {
      setIsLoading(true);

      fetch(`${baseUrl}/frontend/data/page-data-list/home`)
        .then((res) => res.json())
        .then((result) => {
          if (result.success && result.data) {
            setData(result.data);
          }
        })
        .catch((error) => console.error('Error fetching data:', error))
        .finally(() => setIsLoading(false));
    }
  }, [sections]);

  // Helper to strip HTML tags for plain text
  const stripHtml = (html) => {
    if (typeof window === 'undefined') {
      // Server-side: Use regex to strip HTML
      return html.replace(/<[^>]+>/g, '');
    }
    // Client-side: Use DOMParser for more robust HTML stripping
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <section className='bg-gray-100 py-10 md:py-20'>
      <div className='container mx-auto px-6 md:px-12 lg:px-20'>
        {isLoading ? (
          <div className='text-center'>Loading...</div>
        ) : data.length === 0 ? (
          <div className='text-center'>No sections available.</div>
        ) : (
          data.map((section, index) => (
            <div
              key={section.id}
              className='grid grid-cols-1 md:grid-cols-3 gap-10 items-center mb-20'
            >
              {/* Text Content */}
              <div
                className={`col-span-3 md:col-span-1 ${
                  index % 2 === 0 ? '' : 'md:order-last'
                }`}
              >
                <h2 className='text-2xl md:text-3xl font-semibold text-green-900'>
                  {section.title}
                </h2>
                <div
                  className='mt-4 text-gray-600 '
                  dangerouslySetInnerHTML={{ __html: section.description }}
                />
                <div className='mt-10 flex space-x-4'>
                  {/* Primary Button */}
                  {section.is_enquire === 0 ? (
                    <button
                      className='px-8 py-3 border-2 border-[#9d5b07] text-black tracking-wider font-secondary text-xs font-normal hover:bg-[#9d5b07] hover:text-white transition'
                      data-bs-toggle='offcanvas'
                      data-bs-target='#offcanvasForm'
                      aria-controls='offcanvasForm'
                    >
                      {section.btn_text || 'Enquire Now'}
                    </button>
                  ) : (
                    <Link
                      href={section.btn_link || '#'}
                      className='px-8 py-3 border-2 border-[#9d5b07] text-black tracking-wider font-secondary text-xs font-normal hover:bg-[#9d5b07] hover:text-white transition'
                    >
                      {section.btn_text || 'Read More'}
                    </Link>
                  )}
                  {/* Secondary Button */}
                  {section.has_btn2 === 1 &&
                    (section.is_enquire2 === 0 ? (
                      <button
                        className='px-8 py-3 border-2 border-[#9d5b07] text-black tracking-wider font-secondary text-xs font-normal hover:bg-[#9d5b07] hover:text-white transition'
                        data-bs-toggle='offcanvas'
                        data-bs-target='#offcanvasForm'
                        aria-controls='offcanvasForm'
                      >
                        {section.btn2_text || 'Enquire Now'}
                      </button>
                    ) : (
                      <Link
                        href={section.btn2_link || '#'}
                        className='px-8 py-3 border-2 border-[#9d5b07] text-black tracking-wider font-secondary text-xs font-normal hover:bg-[#9d5b07] hover:text-white transition'
                      >
                        {section.btn2_text || 'Read More'}
                      </Link>
                    ))}
                </div>
              </div>
              {/* Image */}
              <div
                className={`col-span-3 md:col-span-2 ${
                  index % 2 === 0 ? 'order-first md:order-none' : 'order-first'
                }`}
              >
                <Image
                  src={
                    section.images?.[0]?.image_path ||
                    '/assets/home/images/placeholder.jpg'
                  }
                  alt={section.image_alt_text || section.title}
                  width={1000}
                  height={600}
                  className=' h-[240px] md:h-[480px] object-cover  border-1 p-1 border-[#9d5b07]'
                  priority={index === 0} // Prioritize first image for LCP
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
