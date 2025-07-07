import Image from 'next/image';
import { PhoneCall } from 'lucide-react';

export default function BookingSection() {
  return (
    <section className='relative w-full h-[350px] md:h-[400px] flex items-start pt-30 justify-center text-white'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <Image
          src='/assets/home/footer-banner.jpg'
          alt='Uday Palace Hotel'
          layout='fill'
          objectFit='cover'
          quality={100}
          priority
        />
        <div className='absolute inset-0 bg-black/30  bg-opacity-30'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 text-center'>
        <h2 className='text-xl md:text-4xl font-bold'>
          Book Us For A Stay Experience Like Never Before.
        </h2>
        <p className='mt-2 text-sm md:text-base tracking-wide uppercase'>
          Book Your Stay Now
        </p>

        {/* Call Button */}
        <div className='mt-4 flex items-center justify-center space-x-2  text-white px-6 py-3   '>
          <PhoneCall className='w-5 h-5 text-white' />
          <a href='tel:+91 81469 93104' className='font-semibold'>
            +91 81469 93104
          </a>
        </div>
      </div>
    </section>
  );
}
