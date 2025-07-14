'use client';

import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import NavbarHero from '@/components/NavbarHero';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { baseUrl } from '@/utils/network';
import Head from 'next/head';

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query; // Get slug from the URL
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog details and related blogs
  useEffect(() => {
    if (!slug) return; // Wait for slug to be available

    const fetchBlog = async () => {
      try {
        // Fetch blog details
        const blogResponse = await fetch(
          `${baseUrl}/frontend/data/blog-details/${slug}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!blogResponse.ok) {
          throw new Error(`Failed to fetch blog: ${blogResponse.statusText}`);
        }

        const blogResult = await blogResponse.json();

        if (!blogResult.success) {
          throw new Error(blogResult.message || 'Failed to retrieve blog');
        }

        setBlog(blogResult.data);

        // Fetch related blogs
        const blogsResponse = await fetch(
          `${baseUrl}/frontend/data/blog-list`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!blogsResponse.ok) {
          throw new Error(
            `Failed to fetch related blogs: ${blogsResponse.statusText}`
          );
        }

        const blogsResult = await blogsResponse.json();

        if (!blogsResult.success) {
          throw new Error(
            blogsResult.message || 'Failed to retrieve related blogs'
          );
        }

        // Filter out the current blog from related blogs
        setRelatedBlogs(blogsResult.data.data.filter((b) => b.slug !== slug));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Render loading state
  if (loading) {
    return (
      <>
        <NavbarHero />
        <div className='container h-screen mx-auto flex items-center justify-center text-center text-gray-200'>
          <div role='status'>
            <svg
              aria-hidden='true'
              className='inline w-8 h-8 text-gray-200 animate-spin fill-yellow-700'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Render error state
  if (error) {
    return (
      <>
        <Head>
          <title>Error | Gaj Retreat</title>
          <meta
            name='description'
            content='An error occurred while fetching the blog post.'
          />
          <meta name='robots' content='noindex, nofollow' />
          <meta property='og:title' content='Error | Gaj Retreat' />
          <meta
            property='og:description'
            content='An error occurred while fetching the blog post.'
          />
          <meta property='og:image' content='/assets/img/slider.jpg' />
          <meta
            property='og:url'
            content={`https://www.gajretreat.com/blog/${slug}`}
          />
          <meta property='og:type' content='website' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Error | Gaj Retreat' />
          <meta
            name='twitter:description'
            content='An error occurred while fetching the blog post.'
          />
          <meta name='twitter:image' content='/assets/img/slider.jpg' />
        </Head>
        <NavbarHero />
        <div className='container mx-auto py-30 text-center text-red-600'>
          Error: {error}
        </div>
        <Footer />
      </>
    );
  }

  // Render blog not found
  if (!blog) {
    return (
      <>
        <Head>
          <title>Blog Not Found | Gaj Retreat</title>
          <meta
            name='description'
            content='The requested blog post could not be found.'
          />
          <meta name='robots' content='noindex, nofollow' />
          <meta property='og:title' content='Blog Not Found | Gaj Retreat' />
          <meta
            property='og:description'
            content='The requested blog post could not be found.'
          />
          <meta property='og:image' content='/assets/img/slider.jpg' />
          <meta
            property='og:url'
            content={`https://www.gajretreat.com/blog/${slug}`}
          />
          <meta property='og:type' content='website' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Blog Not Found | Gaj Retreat' />
          <meta
            name='twitter:description'
            content='The requested blog post could not be found.'
          />
          <meta name='twitter:image' content='/assets/img/slider.jpg' />
        </Head>
        <NavbarHero />
        <div className='container mx-auto py-30 text-center text-gray-600'>
          Blog not found.
        </div>
        <Footer />
      </>
    );
  }

  // Format created_at date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Head>
        <title>{blog.meta_title}</title>
        <meta name='description' content={blog.meta_description} />
        <meta name='robots' content='index, follow' />
        <meta property='og:title' content={blog.meta_title} />
        <meta property='og:description' content={blog.meta_description} />
        <meta property='og:image' content={blog.image_path} />
        <meta
          property='og:url'
          content={`https://www.gajretreat.com/blog/${slug}`}
        />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={blog.meta_title} />
        <meta name='twitter:description' content={blog.meta_description} />
        <meta name='twitter:image' content={blog.image_path} />
      </Head>
      <NavbarHero />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 container py-30'>
        <section className='col-span-3 md:col-span-2'>
          {/* Blog Image */}
          <div className='relative mb-8'>
            <Image
              src={blog.image_path}
              alt={blog.image_alt_text || blog.title}
              width={1000}
              height={600}
              className='object-cover w-full h-[400px] rounded-lg shadow-md'
            />
          </div>

          {/* Blog Title and Date */}
          <div className='text-left mb-6'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>
              {blog.title}
            </h1>
            <p className='mt-2 text-gray-600'>{formatDate(blog.created_at)}</p>
          </div>

          {/* Blog Content */}
          <div
            className='blog-content text-justify break-words'
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </section>

        {/* Related Blogs Section */}
        <section className='col-span-3 md:col-span-1 bg-white p-6 rounded-lg shadow-md sticky top-16'>
          <h3 className='text-xl font-semibold text-gray-900 mb-4'>
            Recent Blogs
          </h3>
          <div>
            {relatedBlogs.length === 0 ? (
              <p className='text-gray-600'>No related blogs available.</p>
            ) : (
              relatedBlogs.map((relatedBlog) => {
                // Ensure relatedBlog has a created_at field before formatting
                const formattedDate = relatedBlog.created_at
                  ? formatDate(relatedBlog.created_at)
                  : 'Date not available';

                return (
                  <div key={relatedBlog.slug} className='mb-6'>
                    <div className='flex items-center'>
                      <Image
                        src={relatedBlog.image_path}
                        alt={relatedBlog.image_alt_text || relatedBlog.title}
                        width={100}
                        height={100}
                        className='object-cover w-20 h-20 rounded-lg shadow-md'
                      />
                      <div className='ml-4'>
                        <Link href={`/blog/${relatedBlog.slug}`}>
                          <h4 className='text-lg font-semibold text-gray-800 hover:text-yellow-700 transition'>
                            {relatedBlog.title}
                          </h4>
                        </Link>
                        <p className='text-gray-600'>{formattedDate}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
