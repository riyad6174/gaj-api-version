import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className='bg-gray-100 py-20'>
      <div className='container mx-auto px-6 md:px-12 lg:px-20'>
        {/* Meetings & Weddings Section */}
        <div className=' gap-10 items-center mb-20'>
          {/* Text Content */}
          <div className=''>
            <h2 className='text-2xl  md:text-3xl font-semibold text-green-900'>
              About Us
            </h2>
            <p className='mt-4 text-gray-700 '>
              Manaswal is the ancestral village of the promoters of Gaj Retreat
              and they can trace back their roots here for over a thousand
              years. The family has been actively involved in the development of
              the area, popularly known as ‘Beet’, in Tehsil Garhshanker.
            </p>
            <p className='mt-4 text-gray-700 '>
              The promoters have vast experience of over 25 years, in the
              Hospitality industry and have been successfully running Koti
              Resort in Himachal Pradesh. They have been pioneers in promoting
              ‘Destination Tourism’. After the success of Koti Resort, the
              promoters started an Adventure Tours outfit, which specialized in
              customized off- road tours in the remote Lahaul-Spiti and Ladakh
              regions wherein they conducted several successful expeditions.
            </p>
            <p className='mt-4 text-gray-700 '>
              Having spent more than 25 years in the hospitality industry and
              having their roots in the village of Manaswal, the promoters
              decided to set up their new project here to promote the natural
              beauty of the area and at the same time give back to the local
              community by adding to the economic development. Keeping in mind
              the ecological sensitivity of the area, Gaj Retreat has been
              conceptualized as an Eco-Resort.
            </p>
            <div className='py-6  md:py-10'>
              <Image
                src='/assets/img/about-us-1.jpg'
                alt='Meeting & Weddings Hall'
                width={1400}
                height={800}
                className=' w-full '
              />
            </div>

            <p className='mt-4 text-gray-700 '>
              Gaj Retreat is a luxury eco resort located on a plateau at
              Manaswal which is a mere 20 min drive from Nangal & 2 hours from
              Chandigarh. Here, guests can relax in their chalets/villas and
              enjoy all that the great outdoors have to offer. And they can do
              so with their eco-conscience at ease.
            </p>
            <p className='mt-4 text-gray-700 '>
              Every aspect of the retreat is designed to be environmentally
              friendly and it has been built using local materials and manpower
              to ensure minimum negative impact on the environment. The retreat
              has extensive recycling and refuge-elimination programs in order
              to cut and offset its carbon footprint.
            </p>
            <p className='mt-4 text-gray-700 '>
              Gaj Retreat truly features exotic luxury in complete harmony with
              all the elements of nature that make this property so very
              special. The Retreat spans over acres of beautiful forest land and
              has been developed with the deepest respect for the natural
              environment.
            </p>
            <p className='mt-4 text-gray-700 '>
              From the moment you set foot on the property you are bound to get
              mesmerized by the surrounding landscapes, dramatic sunsets and
              starry nights.
            </p>
            <p className='mt-4 text-gray-700 '>
              What’s more the Retreat offers an excellent rejuvenation
              opportunity coupled with conservation experiences and an array of
              unique adventure activities.
            </p>
          </div>
          {/* Image */}
        </div>
      </div>
    </section>
  );
}
