import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ImageSlider = ({
  images,
  height = 'h-[300px] md:h-[480px]', // Default height
  showNavigation = false,
  showPagination = false,
  className = '',
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={showNavigation}
      pagination={showPagination ? { clickable: true } : false}
      spaceBetween={10}
      speed={1000}
      autoplay
      loop
      slidesPerView={1}
      className={`w-full ${height} ${className}`}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            width={1000}
            height={800}
            className='w-full h-full border-14  border-white shadow-xl  object-cover '
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
