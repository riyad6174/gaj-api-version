export default function HowToReach() {
  return (
    <section className='py-8 md:py-16 bg-slate-50'>
      <div className='container mx-auto px-6 md:px-12 lg:px-20'>
        {/* Heading */}
        <h2 className='text-3xl md:text-4xl font-semibold text-gray-900 mb-6'>
          How to get to the hotel Gaj Resort
        </h2>

        {/* Address */}
        <p className='text-gray-700 font-medium'>
          How to get to the Gaj Resort, a member of Radisson Individuals
        </p>

        {/* Description */}
        {/* <p className='mt-4 text-gray-600 max-w-3xl'>
          Nestled in the serene hills of Himachal Pradesh, Gaj Retreat is easily
          accessible by road and offers a peaceful escape from the city hustle.
        </p> */}

        {/* Travel Information */}
        <div className='mt-6 space-y-6'>
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              class='bi bi-geo-alt-fill'
              viewBox='0 0 16 16'
            >
              <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6' />
            </svg>
            <h3 className='text-lg font-bold text-gray-900 ml-2'>
              {' '}
              From Chandigarh Airport
            </h3>
          </div>
          <span className='mt-2 text-gray-600'>
            <span className='font-semibold mr-1'> By car/taxi:</span>, The
            journey from the airport is 118 kilometers long and takes
            approximately 2.5 hours, depending on traffic.
          </span>

          <div className='flex items-center mt-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              class='bi bi-geo-alt-fill'
              viewBox='0 0 16 16'
            >
              <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6' />
            </svg>
            <h3 className='text-lg font-bold text-gray-900 ml-2'>
              {' '}
              From the Garshanker bus station
            </h3>
          </div>
          <span className='mt-2 text-gray-600'>
            <span className='font-semibold mr-1'> By car/taxi:</span>, The
            journey from the Garshanker bus stand takes approximately 35 minutes
            and is 19 kilometers long.
          </span>
          <div className='flex items-center mt-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              class='bi bi-geo-alt-fill'
              viewBox='0 0 16 16'
            >
              <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6' />
            </svg>
            <h3 className='text-lg font-bold text-gray-900 ml-2'>
              {' '}
              From the Anandpur Sahib train station
            </h3>
          </div>
          <span className='mt-2 text-gray-600'>
            <span className='font-semibold mr-1'> By car/taxi:</span>, The
            journey from the train station is approximately 31 kilometers long
            and takes 50 minutes, depending on traffic.
          </span>
        </div>
      </div>
    </section>
  );
}
