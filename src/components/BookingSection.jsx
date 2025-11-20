import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

export default function BookingSection() {
  return (
    <section className='relative w-full h-[350px] md:h-[400px]'>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className='h-full'
      >
        <SwiperSlide>
          <Image
            src='/assets/home/new-year-banner.jpg'
            alt='New Year Banner'
            layout='fill'
            objectFit='cover'
            quality={100}
            priority
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/assets/home/christmas-banner.jpg'
            alt='Christmas Banner'
            layout='fill'
            objectFit='cover'
            quality={100}
            priority
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
