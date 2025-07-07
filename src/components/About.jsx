import Image from 'next/image';

export default function About() {
  return (
    <section className='relative py-24 bg-white'>
      <div className='container mx-auto px-6 md:px-6 lg:px-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-30 items-center'>
          {/* Left Side: Image */}
          <div className='relative '>
            <Image
              src='/assets/home/discover-gaj-retreat-main.jpg'
              alt='Luxury Room'
              width={600}
              height={1000}
              className=''
            />
            {/* Small Overlay Image */}
            <div className='absolute h-[145px] w-[240px]  bottom-[-40px] right-[-20px] md:right-[-50px]  md:w-[220px] bg-white p-3 shadow-lg '>
              <Image
                src='/assets/home/discover-gaj-retreat-small.jpg'
                alt='Room View'
                width={220}
                height={140}
                className=' h-full w-full object-cover'
              />
            </div>
          </div>

          <div className='order-first md:order-none'>
            <h2 className='text-[28px] md:text-2xl font-semibold text-gray-800 leading-tight '>
              DISCOVER GAJ RETREAT
            </h2>

            {/* Two-Column Text with Drop Cap */}
            <div className='mt-6 text-gray-600 leading-relaxed md:columns-2 gap-8 text-justify break-words '>
              <span className='text-6xl font-[100]  text-gray-800 float-left leading-none pr-2'>
                D
              </span>
              iscover a tranquil retreat at Gaj Resort, a member of Radisson
              Individuals Retreats. Situated on a scenic plateau, our resort
              offers eco-friendly amenities designed to ensure minimal negative
              impact on the environment and a relaxing escape in complete
              balance with nature. <br /> From the moment you step on our
              resort, you’ll be mesmerized by lush landscapes, colorful sunsets,
              and pristine, starry nights. Enjoy a memorable stay in our stylish
              rooms and villas and discover our delightful dining destinations,
              sparkling pools, elegant event spaces, and manicured gardens with
              peaceful fountains and lush greenery.
              <br />
              Just a short trip away from Anandpur Sahib, our resort offers easy
              access to revered sacred sites like Gurudwara Takht Sri Kesgarh
              Sahib as well as exciting opportunities to discover everything the
              great outdoors has to offer.
              <br />
              Alongside our journey, we have spearheaded innovative concepts
              such as <span className=''>‘destination tourism’</span>,{' '}
              <span className=''>‘destination weddings’</span> ,
              <span className=''>‘Indian wedding traditions’</span>, and{' '}
              <span className=''>‘family bonding’</span>, attracting visitors
              from distant corners to revel in distinctive experiences at Gaj
              Retreat.Encouraged by the resounding feedback from our esteemed
              guests, we ventured further by establishing an Adventure Tours
              division. This specialized endeavor is dedicated to curating
              tailored off-road expeditions in the remote and awe-inspiring
              terrains of Lahaul-Spiti and Ladakh. Our endeavors have led to
              numerous triumphant journeys, captivating adventurers seeking
              exhilarating experiences.
            </div>
          </div>
        </div>
        {/* <div className='absolute left-1/4 top-0 w-full h-full bg-gray-100 opacity-50 -z-1'></div> */}
      </div>
    </section>
  );
}
