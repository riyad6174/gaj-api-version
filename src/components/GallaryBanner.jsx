import Image from 'next/image';

export default function GallaryBanner() {
  return (
    <section className='relative w-full h-[300px] md:h-[480px] flex items-center'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <Image
          src='/assets/home/footer-banner.jpg'
          alt='Accommodation'
          layout='fill'
          objectFit='cover'
          quality={90}
          priority
        />
        <div className='absolute inset-0 bg-black/20  bg-opacity-30'></div>
      </div>

      {/* Title Text */}
      <div className='relative z-10 w-full px-6 md:px-20 lg:px-30 flex justify-end container'>
        <h1 className='text-3xl md:text-5xl font-bold text-white  border-l-8 border-white px-4'>
          Gallery
        </h1>
      </div>
    </section>
  );
}
