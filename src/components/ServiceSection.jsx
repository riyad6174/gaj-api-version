import {
  ParkingCircle,
  Leaf,
  BedSingle,
  Binoculars,
  Gem,
  Presentation,
  Sparkles,
  Droplet,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper and SwiperSlide
import { Autoplay } from 'swiper/modules';

import 'swiper/css'; // Import basic Swiper CSS
import 'swiper/css/navigation'; // Import Swiper navigation CSS
import 'swiper/css/pagination'; // Import Swiper pagination CSS

export default function ServicesSection() {
  return (
    <section className='py-10 md:py-20 bg-white'>
      <div className='container mx-auto px-6 md:px-12 lg:px-20 text-center'>
        {/* Section Heading */}
        <h3 className='text-sm font-semibold uppercase tracking-widest text-gray-600'>
          Services & Amenities
        </h3>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mt-2'>
          Services & Amenities of our hotels in Punjab
        </h2>
        {/* <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
          At Gaj Treat, we offer a perfect blend of comfort, luxury, and
          nature’s beauty to make your stay truly unforgettable.
        </p> */}

        {/* Decorative Separator */}
        <div className='mt-6 flex justify-center items-center'>
          <span className='h-[2px] w-16 bg-gray-400'></span>
          <span className='mx-2 text-gray-500 text-lg'>✿</span>
          <span className='h-[2px] w-16 bg-gray-400'></span>
        </div>

        {/* Services Slider */}
        <div className='mt-12'>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20} // Space between slides
            autoplay={{ delay: 3000 }} // Autoplay with a delay of 3 seconds
            slidesPerView={1} // Default for smaller screens
            breakpoints={{
              640: {
                slidesPerView: 2, // 2 slides per view on small screens
              },
              1024: {
                slidesPerView: 3, // 3 slides per view on larger screens
              },
            }}
            pagination={{ clickable: true }} // Enable clickable pagination
            loop={true} // Enable looping of slides
          >
            {[
              {
                icon: <BedSingle size={50} />,
                title: 'Dining and Leisure',
                description:
                  'Fine dining restaurant, exotic bar, and lounge cafe',
              },
              {
                icon: <Gem size={50} />,
                title: 'Perfect for Weddings & Special Events',
                description:
                  'Make unforgettable memories with beautiful outdoor spaces, breathtaking views, and expert event planning services.',
              },
              {
                icon: <Droplet size={50} />,
                title: 'Swimming Facilities',
                description:
                  'Dive into tranquility with two pristine swimming pools, perfect for a leisurely swim or a moment of blissful reflection.',
              },
              {
                icon: <Presentation size={50} />,
                title: 'Corporate Meetings & Events',
                description:
                  'Hold productive meetings with state-of-the-art amenities, high-speed internet, and a calm, inspiring setting.',
              },
              {
                icon: <Leaf size={50} />,
                title: 'Eco Retreat',
                description:
                  'Enjoy sustainable hospitality where eco-friendly practices meet luxurious comfort with a commitment to the environment.',
              },
            ].map((service, index) => (
              <SwiperSlide key={index}>
                <div className='flex flex-col items-center text-center'>
                  <div className='text-5xl text-gray-700'>{service.icon}</div>
                  <h3 className='mt-4 text-xl font-semibold text-gray-900'>
                    {service.title}
                  </h3>
                  <p className='mt-2 text-gray-600'>{service.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
