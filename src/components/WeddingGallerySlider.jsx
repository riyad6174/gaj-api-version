'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Generate image array dynamically
const images = Array.from({ length: 19 }, (_, i) => ({
  src: `/assets/wedding/slider/gaj-wedding-image-${i + 1}.webp`,
  alt: `Gaj Retreat Wedding Gallery Image ${i + 1}`,
  width: 800,
  height: 450,
}));

export default function WeddingGallerySlider() {
  return (
    <section className='py-10 bg-white'>
      <div className='container mx-auto px-6 md:px-12 lg:px-20 relative'>
        <div className='relative'>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            // navigation={{
            //   prevEl: '.swiper-prev',
            //   nextEl: '.swiper-next',
            // }}
            // pagination={{
            //   el: '.custom-pagination',
            //   clickable: true,
            //   renderBullet: (index, className) =>
            //     `<span class="${className} w-3 h-3 bg-gray-400 rounded-full hover:bg-yellow-700 transition"></span>`,
            // }}
            className='w-full'
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className='relative overflow-hidden shadow-md rounded-sm'>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                    placeholder='blur'
                    blurDataURL='/assets/placeholder.jpg' // Replace with low-res placeholder
                    className='object-cover w-full h-[250px]'
                    loading='lazy'
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          {/* <button
            className='swiper-prev absolute left-[10px] top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition'
            aria-label='Previous slide'
          >
            <ChevronLeft className='w-6 h-6 text-white' />
          </button>
          <button
            className='swiper-next absolute right-[10px] top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition'
            aria-label='Next slide'
          >
            <ChevronRight className='w-6 h-6 text-white' />
          </button> */}

          {/* Custom Pagination */}
          <div className='custom-pagination mt-4 flex justify-center space-x-2'></div>
        </div>
      </div>
    </section>
  );
}
