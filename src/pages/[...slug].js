import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DynamicBanner from '@/components/DynamicBanner';
import DynamicSection from '@/components/DynamicSection';
import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import { baseUrl } from '@/utils/network';

export default function DynamicPage() {
  const router = useRouter();
  const { slug } = router.query; // Get the slug array from the URL
  const [pageData, setPageData] = useState(null);
  const [isChildPage, setIsChildPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return; // Wait until slug is available

    const fetchPageData = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        let data;

        // Check slug structure
        const slugArray = Array.isArray(slug) ? slug : [slug];
        console.log(slug, 'slug', slugArray, slugArray.length, 'slugArray');
        if (slugArray.length === 2) {
          // Case: /accomodation/section/slug
          setIsChildPage(true);
          const childSlug = slugArray[slugArray.length - 1];
          response = await fetch(
            `${baseUrl}/frontend/data/sub-page/data/child-data-by-slug?slug=${encodeURIComponent(
              childSlug
            )}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        } else {
          // Case: /pagename or /pagename/section
          setIsChildPage(false);
          const pageUrl = Array.isArray(slug)
            ? `/${slug.join('/')}`
            : `/${slug}`;
          response = await fetch(
            `${baseUrl}/frontend/data/sub-page/data/data-by-url?url=${encodeURIComponent(
              pageUrl
            )}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        }

        data = await response.json();

        if (response.ok && data.success && data.data) {
          setPageData(data.data);
        } else {
          setError(data.message || 'No data found for this URL.');
        }
      } catch (error) {
        setError('An error occurred while fetching page data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [slug]);

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col'>
        <NavbarHero />
        <div className='flex-grow flex items-center justify-center '>
          <div className='text-center h-screen'>
            <p className='text-lg font-semibold dark:text-white'>Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className='min-h-screen flex flex-col'>
        <NavbarHero />
        <div className='flex-grow flex items-center justify-center bg-gray-800 '>
          <div className='text-center p-6'>
            <h1 className='text-3xl font-bold text-red-500 mb-4'>
              Page Not Found
            </h1>
            <p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
              {error || 'The page you are looking for does not exist.'}
            </p>
            <button
              onClick={() => router.push('/')}
              className='bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition'
            >
              Go to Homepage
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <NavbarHero />
      <DynamicBanner
        bannerImg={
          isChildPage ? pageData?.image_path : pageData?.banner_image_path
        }
        title={pageData?.title}
      />
      <DynamicSection pageData={pageData} isChildPage={isChildPage} />
      <Footer />
    </div>
  );
}
