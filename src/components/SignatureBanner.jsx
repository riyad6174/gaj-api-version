import Image from 'next/image';

export default function SignatureBanner() {
  return (
    <section className='relative w-full h-[340px] md:h-[480px]  flex items-center'>
      <div className='absolute inset-0 bg-black/20 z-10'></div>

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
      <div className='container relative z-10 w-full px-6 md:px-20 lg:px-30 flex justify-end'>
        <h1 className='text-3xl md:text-5xl font-bold text-white  border-r-8 border-white px-4 mt-20'>
          Signature Itineraries
        </h1>
      </div>
    </section>
  );
}
