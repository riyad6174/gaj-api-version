'use client';

import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'yet-another-react-lightbox/styles.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Dynamically import Lightbox to reduce initial bundle size
const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
  ssr: false, // Disable SSR for lightbox
});

// Manually defined image array
const images = [
  {
    src: '/assets/gallary/gaj-gallery-1.jpg',
    alt: 'Gaj Resort Gallery Image 1',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-2.jpg',
    alt: 'Gaj Resort Gallery Image 2',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-3.jpg',
    alt: 'Gaj Resort Gallery Image 3',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-4.jpg',
    alt: 'Gaj Resort Gallery Image 4',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-5.jpg',
    alt: 'Gaj Resort Gallery Image 5',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-6.jpg',
    alt: 'Gaj Resort Gallery Image 6',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-7.jpg',
    alt: 'Gaj Resort Gallery Image 7',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-8.jpg',
    alt: 'Gaj Resort Gallery Image 8',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-9.jpg',
    alt: 'Gaj Resort Gallery Image 9',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-10.jpg',
    alt: 'Gaj Resort Gallery Image 10',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-11.jpg',
    alt: 'Gaj Resort Gallery Image 11',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-12.jpg',
    alt: 'Gaj Resort Gallery Image 12',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-13.jpg',
    alt: 'Gaj Resort Gallery Image 13',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-14.jpg',
    alt: 'Gaj Resort Gallery Image 14',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-15.jpg',
    alt: 'Gaj Resort Gallery Image 15',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-16.jpg',
    alt: 'Gaj Resort Gallery Image 16',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-17.jpg',
    alt: 'Gaj Resort Gallery Image 17',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-18.jpg',
    alt: 'Gaj Resort Gallery Image 18',
    width: 400,
    height: 300,
  },
  // {
  //   src: '/assets/gallary/gaj-gallery-19.jpg',
  //   alt: 'Gaj Resort Gallery Image 19',
  //   width: 400,
  //   height: 300,
  // },
  {
    src: '/assets/gallary/gaj-gallery-20.jpg',
    alt: 'Gaj Resort Gallery Image 20',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-21.jpg',
    alt: 'Gaj Resort Gallery Image 21',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-22.jpg',
    alt: 'Gaj Resort Gallery Image 22',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-23.jpg',
    alt: 'Gaj Resort Gallery Image 23',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-24.jpg',
    alt: 'Gaj Resort Gallery Image 24',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-25.jpg',
    alt: 'Gaj Resort Gallery Image 25',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-26.jpg',
    alt: 'Gaj Resort Gallery Image 26',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-27.jpg',
    alt: 'Gaj Resort Gallery Image 27',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-28.jpg',
    alt: 'Gaj Resort Gallery Image 28',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-29.jpg',
    alt: 'Gaj Resort Gallery Image 29',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-30.jpg',
    alt: 'Gaj Resort Gallery Image 30',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-31.jpg',
    alt: 'Gaj Resort Gallery Image 31',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-32.jpg',
    alt: 'Gaj Resort Gallery Image 32',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-33.jpg',
    alt: 'Gaj Resort Gallery Image 33',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-34.jpg',
    alt: 'Gaj Resort Gallery Image 34',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-35.jpg',
    alt: 'Gaj Resort Gallery Image 35',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-36.jpg',
    alt: 'Gaj Resort Gallery Image 36',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-37.jpg',
    alt: 'Gaj Resort Gallery Image 37',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-38.jpg',
    alt: 'Gaj Resort Gallery Image 38',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-39.jpg',
    alt: 'Gaj Resort Gallery Image 39',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-40.jpg',
    alt: 'Gaj Resort Gallery Image 40',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-41.jpg',
    alt: 'Gaj Resort Gallery Image 41',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-42.jpg',
    alt: 'Gaj Resort Gallery Image 42',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-43.jpg',
    alt: 'Gaj Resort Gallery Image 43',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-44.jpg',
    alt: 'Gaj Resort Gallery Image 44',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-45.jpg',
    alt: 'Gaj Resort Gallery Image 45',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-46.jpg',
    alt: 'Gaj Resort Gallery Image 46',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-47.jpg',
    alt: 'Gaj Resort Gallery Image 47',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-48.jpg',
    alt: 'Gaj Resort Gallery Image 48',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-49.jpg',
    alt: 'Gaj Resort Gallery Image 49',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-50.jpg',
    alt: 'Gaj Resort Gallery Image 50',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-51.jpg',
    alt: 'Gaj Resort Gallery Image 51',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-52.jpg',
    alt: 'Gaj Resort Gallery Image 52',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-53.jpg',
    alt: 'Gaj Resort Gallery Image 53',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-54.jpg',
    alt: 'Gaj Resort Gallery Image 54',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-55.jpg',
    alt: 'Gaj Resort Gallery Image 55',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-56.jpg',
    alt: 'Gaj Resort Gallery Image 56',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-57.jpg',
    alt: 'Gaj Resort Gallery Image 57',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-58.jpg',
    alt: 'Gaj Resort Gallery Image 58',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-59.jpg',
    alt: 'Gaj Resort Gallery Image 59',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-60.jpg',
    alt: 'Gaj Resort Gallery Image 60',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-61.jpg',
    alt: 'Gaj Resort Gallery Image 61',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-62.jpg',
    alt: 'Gaj Resort Gallery Image 62',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-63.jpg',
    alt: 'Gaj Resort Gallery Image 63',
    width: 400,
    height: 300,
  },
  {
    src: '/assets/gallary/gaj-gallery-64.jpg',
    alt: 'Gaj Resort Gallery Image 64',
    width: 400,
    height: 300,
  },
];

// Reverse the images array to show the last image first
const reversedImages = [...images].reverse();

export default function GalleryGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const imagesPerPage = 10;

  // Calculate pagination indices
  const indexOfFirstImage = (currentPage - 1) * imagesPerPage;
  const indexOfLastImage = Math.min(
    currentPage * imagesPerPage,
    reversedImages.length
  );
  const currentImages = reversedImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );

  // Total pages
  const totalPages = Math.ceil(reversedImages.length / imagesPerPage);

  // Optimize page change handler
  const handlePageChange = useCallback(
    (newPage) => {
      setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
      window.scrollTo({ top: 20, behavior: 'smooth' });
    },
    [totalPages]
  );

  // Optimize image click handler
  const handleImageClick = useCallback(
    (index) => {
      const fullIndex = indexOfFirstImage + index;
      setPhotoIndex(fullIndex);
      setIsOpen(true);
    },
    [indexOfFirstImage]
  );

  // Generate dynamic page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always include the first page
    pageNumbers.push(1);

    // Calculate the range of pages to show around the current page
    const startPage = Math.max(2, currentPage); // Start from current page or 2
    const endPage = Math.min(currentPage + 2, totalPages - 2); // Show up to 2 pages after current, but stop before the last 2 pages

    // Add ellipsis if there's a gap between page 1 and the start of the current range
    if (startPage > 2) {
      pageNumbers.push('...');
    }

    // Add the current page and the next two pages (if they exist)
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if there's a gap between the end of the current range and the last two pages
    if (endPage < totalPages - 2) {
      pageNumbers.push('...');
    }

    // Always include the last two pages (if totalPages > 1)
    if (totalPages > 1) {
      if (totalPages - 1 !== endPage && totalPages - 1 !== 1) {
        pageNumbers.push(totalPages - 1);
      }
      if (totalPages !== endPage) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <section className='py-8 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 md:px-12 lg:px-20'>
        <div className='text-center'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900'>
            Gallery
          </h2>
          <div className='mt-2 flex justify-center items-center'>
            <span className='h-[2px] w-12 sm:w-16 bg-gray-400'></span>
            <span className='mx-2 text-gray-500 text-base sm:text-lg'>✿</span>
            <span className='h-[2px] w-12 sm:w-16 bg-gray-400'></span>
          </div>
        </div>

        <div className='mt-6 sm:mt-10 space-y-3'>
          {/* First row - 3 columns */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
            {currentImages.slice(0, 3).map((img, index) => (
              <div
                key={`${currentPage}-${index}`}
                className='relative overflow-hidden shadow-md hover:shadow-lg rounded-lg min-h-[150px] sm:min-h-[200px] cursor-pointer'
                onClick={() => handleImageClick(index)}
                role='button'
                aria-label={`View image ${
                  indexOfFirstImage + index + 1
                } in lightbox`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                  placeholder='blur'
                  blurDataURL='/assets/placeholder.jpg'
                  className='object-cover w-full h-full transition-transform transform hover:scale-105'
                />
              </div>
            ))}
          </div>

          {/* Second row - 4 columns */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'>
            {currentImages.slice(3, 7).map((img, index) => (
              <div
                key={`${currentPage}-${index + 3}`}
                className='relative overflow-hidden shadow-md hover:shadow-lg rounded-lg min-h-[150px] sm:min-h-[200px] cursor-pointer'
                onClick={() => handleImageClick(index + 3)}
                role='button'
                aria-label={`View image ${
                  indexOfFirstImage + index + 4
                } in lightbox`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw'
                  placeholder='blur'
                  blurDataURL='/assets/placeholder.jpg'
                  className='object-cover w-full h-full transition-transform transform hover:scale-105'
                />
              </div>
            ))}
          </div>

          {/* Third row - 3 columns */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
            {currentImages.slice(7, 10).map((img, index) => (
              <div
                key={`${currentPage}-${index + 7}`}
                className='relative overflow-hidden shadow-md hover:shadow-lg rounded-lg min-h-[150px] sm:min-h-[200px] cursor-pointer'
                onClick={() => handleImageClick(index + 7)}
                role='button'
                aria-label={`View image ${
                  indexOfFirstImage + index + 8
                } in lightbox`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                  placeholder='blur'
                  blurDataURL='/assets/placeholder.jpg'
                  className='object-cover w-full h-full transition-transform transform hover:scale-105'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className='mt-8 sm:mt-12 flex justify-center items-center gap-1 sm:gap-2'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 cursor-pointer sm:px-4 sm:py-2 rounded-full border border-gray-300 text-gray-700 font-medium transition-all ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
            aria-label='Previous page'
          >
            <span className='block sm:hidden'>
              <ChevronLeft className='w-5 h-5' />
            </span>
            <span className='hidden sm:block'>Previous</span>
          </button>

          <div className='flex flex-wrap gap-1'>
            {getPageNumbers().map((number, index) => (
              <React.Fragment key={index}>
                {number === '...' ? (
                  <span className='w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center text-gray-700 font-medium text-sm sm:text-base'>
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => handlePageChange(number)}
                    className={`w-8 cursor-pointer sm:w-10 h-8 sm:h-10 rounded-full border border-gray-300 text-gray-700 font-medium transition-all text-sm sm:text-base ${
                      currentPage === number
                        ? 'bg-yellow-700 text-white border-yellow-700'
                        : 'hover:bg-gray-100'
                    }`}
                    aria-label={`Page ${number}`}
                    aria-current={currentPage === number ? 'page' : undefined}
                  >
                    {number}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 sm:px-4 cursor-pointer sm:py-2 rounded-full border border-gray-300 text-gray-700 font-medium transition-all ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
            aria-label='Next page'
          >
            <span className='block sm:hidden'>
              <ChevronRight className='w-5 h-5' />
            </span>
            <span className='hidden sm:block'>Next</span>
          </button>
        </div>

        {/* Lightbox */}
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={reversedImages.slice(
              Math.max(0, photoIndex - 10),
              Math.min(reversedImages.length, photoIndex + 11)
            )} // Load only ±10 images around current index
            index={Math.min(10, photoIndex)} // Adjust index for sliced array
            on={{
              index: (newIndex) =>
                setPhotoIndex(newIndex + Math.max(0, photoIndex - 10)),
            }}
            render={{
              slide: ({ slide }) => (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              ),
            }}
          />
        )}
      </div>
    </section>
  );
}
