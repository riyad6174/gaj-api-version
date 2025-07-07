'use client';
import { baseUrl } from '@/utils/network';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format created_at date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${baseUrl}/blog`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.statusText}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Failed to retrieve blog list');
        }

        setBlogs(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <section className='py-16 bg-white'>
        <div className='container mx-auto'>
          <div className='text-center'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
              Blogs
            </h2>
            <div className='mt-2 flex justify-center items-center'>
              <span className='h-[2px] w-16 bg-gray-400'></span>
              <span className='mx-2 text-gray-500 text-lg'>✿</span>
              <span className='h-[2px] w-16 bg-gray-400'></span>
            </div>
          </div>
          <div className='container py-20 mx-auto flex items-center justify-center text-center text-gray-200'>
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
        </div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section className='py-16 bg-white'>
        <div className='container mx-auto'>
          <div className='text-center'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
              Blogs
            </h2>
            <div className='mt-2 flex justify-center items-center'>
              <span className='h-[2px] w-16 bg-gray-400'></span>
              <span className='mx-2 text-gray-500 text-lg'>✿</span>
              <span className='h-[2px] w-16 bg-gray-400'></span>
            </div>
          </div>
          <div className='mt-10 text-center text-red-600'>Error: {error}</div>
        </div>
      </section>
    );
  }

  // Render blog cards
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto'>
        {/* Section Heading */}
        <div className='text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
            Blogs
          </h2>
          <div className='mt-2 flex justify-center items-center'>
            <span className='h-[2px] w-16 bg-gray-400'></span>
            <span className='mx-2 text-gray-500 text-lg'>✿</span>
            <span className='h-[2px] w-16 bg-gray-400'></span>
          </div>
        </div>

        {/* Blog Grid Section */}
        <section className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
          {blogs.length === 0 ? (
            <div className='col-span-full text-center text-gray-600'>
              No blogs available.
            </div>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className='bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-[450px]' // Fixed height for card
              >
                {/* Image */}
                <div className='w-full h-48 relative'>
                  <img
                    src={blog.image_path}
                    alt={blog.title}
                    className='object-cover w-full h-full'
                  />
                </div>

                {/* Content */}
                <div className='p-4 flex flex-col flex-grow'>
                  {/* Title with truncation */}
                  <h3 className='text-2xl font-semibold text-gray-800 line-clamp-2'>
                    {blog.title}
                  </h3>
                  <p className='text-gray-600 text-sm mt-2'>
                    {formatDate(blog.created_at)}
                  </p>
                  {/* Short description with truncation */}
                  <p className='text-gray-600 text-sm mt-4 line-clamp-2 flex-grow'>
                    {blog.short_description}
                  </p>
                  {/* Button at bottom */}
                  <Link
                    href={`/blog/${blog.slug}`}
                    className='mt-4 w-full bg-[#553f26] text-center text-white py-2 px-6 rounded-md hover:bg-yellow-800 transition'
                  >
                    See Full
                  </Link>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </section>
  );
}
