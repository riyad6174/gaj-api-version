import { useState } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const faqData = [
  {
    question: 'What makes Gaj Retreat the best resort in Punjab?',
    answer:
      'Gaj Retreat, a member of Radisson Individuals Retreats, is widely regarded as one of the premier resorts in Punjab due to its luxurious accommodations, exceptional service, and stunning natural surroundings. Nestled on a plateau near Manaswal, a 20-minute drive from Nangal and a 2-hour drive from Chandigarh, the resort offers a serene escape with breathtaking views of hills and forests. With 25 years of experience in the hospitality industry, Gaj Retreat is committed to eco-friendly practices and provides a range of accommodations, including Chateaus, Villa Suites, Luxury Tents, and Deluxe Rooms. Guests can enjoy unique activities such as Horse Safari, Off-Roading, and Mountain Biking, making it an ideal destination for both relaxation and adventure. For more details, explore our <a href="https://www.gajretreat.com/about-us/" class="text-blue-600 hover:underline">About Us</a> page.',
  },
  {
    question: 'What amenities are available at Gaj Retreat?',
    answer:
      'Gaj Retreat offers an array of luxurious amenities tailored to diverse traveler needs. Accommodations include elegantly designed Chateaus with private balconies, Villa Suites with private pools, Luxury Tents with Victorian-style baths, and Deluxe Rooms with floor-to-ceiling windows offering views of the surrounding hills. The resort also provides a variety of outdoor activities, such as Horse Safari, Off-Roading, All-Terrain Vehicle experiences, and Mountain Biking, alongside specialized Adventure Tours to destinations like Lahaul-Spiti and Ladakh. Additionally, Gaj Retreat is a premier venue for destination weddings and corporate events. Visit our <a href="https://www.gajretreat.com/acoomodations/" class="text-blue-600 hover:underline">Accommodations</a> page for more information.',
  },
  {
    question: 'Why is Gaj Retreat considered the best wedding destination?',
    answer:
      'Gaj Retreat is recognized as one of the finest wedding destinations in India, offering a picturesque setting and comprehensive wedding services. Its location on a plateau surrounded by lush hills and forests provides a romantic and scenic backdrop for ceremonies and receptions. With 25 years of expertise in hosting destination weddings, Gaj Retreat combines traditional Indian wedding elements with modern luxury. The resort offers customizable wedding packages that include accommodation, catering, decor, and event planning, ensuring a seamless and memorable experience for couples and their guests. Learn more on our <a href="https://www.gajretreat.com/events/weddings/" class="text-blue-600 hover:underline">Weddings</a> page.',
  },
  {
    question: 'What wedding packages does Gaj Retreat offer?',
    answer:
      'Gaj Retreat provides tailored wedding packages to suit various preferences and budgets. These packages encompass luxurious accommodations, professional catering, bespoke decor, and comprehensive event planning services. Whether you envision an intimate ceremony or a grand celebration, our team ensures every detail is meticulously handled. For detailed information on our wedding packages, please visit our <a href="https://www.gajretreat.com/events/weddings/" class="text-blue-600 hover:underline">Weddings</a> page or contact our event planning team directly.',
  },
  {
    question: 'What kind of views does Gaj Retreat offer?',
    answer:
      'Gaj Retreat is celebrated as one of the best view hotels in Punjab, offering stunning vistas of the surrounding hills and forests. Located on a plateau near Manaswal, the resort provides a tranquil setting with panoramic scenery. Guests staying in our Chateaus enjoy private balconies with forest canopy views, while Villa Suites feature private pools overlooking the lush landscape. Deluxe Rooms are equipped with floor-to-ceiling windows that showcase the swimming pool and hills, ensuring a picturesque experience for all guests. Discover more about our accommodations on our <a href="https://www.gajretreat.com/acoomodations/" class="text-blue-600 hover:underline">Accommodations</a> page.',
  },
  {
    question: 'Are there rooms with scenic views at Gaj Retreat?',
    answer:
      'Yes, all accommodations at Gaj Retreat are designed to maximize scenic views. The Chateaus offer first-floor balconies with sweeping views of the forest canopy, while Villa Suites provide private pools and opulent baths with vistas of the surrounding landscape. Deluxe Rooms feature floor-to-ceiling windows that allow abundant natural light and views of the swimming pool and hills. This makes Gaj Retreat a top choice for those seeking the best view hotels in Punjab. Explore our room options on our <a href="https://www.gajretreat.com/acoomodations/" class="text-blue-600 hover:underline">Accommodations</a> page.',
  },
  {
    question: 'Is Gaj Retreat the same as Gaj Radisson Individuals?',
    answer:
      'Gaj Retreat is a member of Radisson Individuals Retreats, and the term "Gaj Radisson Induvishal" likely refers to the resort, possibly due to its affiliation with the Radisson brand. Located in Garhshankar, Punjab, Gaj Retreat is known for its luxurious accommodations, eco-friendly practices, and exceptional hospitality. For more information about our resort, visit our <a href="https://www.gajretreat.com/about-us/" class="text-blue-600 hover:underline">About Us</a> page.',
  },
  {
    question: 'Where can I see photos of Gaj Retreat?',
    answer:
      'Visitors can explore a comprehensive gallery of photos on our website, showcasing Gaj Retreat’s luxurious accommodations, event spaces, and stunning natural surroundings. Images include our Chateaus, Villa Suites, Luxury Tents, and Deluxe Rooms, as well as the resort’s scenic views and wedding venues. To view our photo gallery, visit our <a href="https://www.gajretreat.com/acoomodations/" class="text-blue-600 hover:underline">Accommodations</a> and <a href="https://www.gajretreat.com/events/" class="text-blue-600 hover:underline">Events</a> pages.',
  },
];

const FAQSection = () => {
  return (
    <section className='bg-gray-100 py-12 md:py-20'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
            Frequently Asked Questions
          </h2>
          <p className='mt-4 text-lg text-gray-600'>
            Everything you need to know about staying at Gaj Retreat
          </p>
        </div>

        {/* FAQ List */}
        <div className='space-y-4'>
          {faqData.map((faq, index) => (
            <Disclosure
              key={index}
              as='div'
              className='bg-white rounded-lg shadow-md'
            >
              {({ open }) => (
                <>
                  <DisclosureButton className='cursor-pointer flex justify-between w-full px-6 py-5 text-left text-lg font-semibold text-gray-900 rounded-lg'>
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </DisclosureButton>
                  <Transition
                    enter='transition ease-out duration-200'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-150'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <DisclosurePanel className='px-6 pb-5 text-gray-700'>
                      <div
                        className='text-base leading-relaxed'
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </DisclosurePanel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>

        {/* Contact CTA */}
        <div className='mt-12 text-center'>
          <p className='text-lg text-gray-600'>
            Still have questions? Feel free to reach out to us!
          </p>
          <Link
            href='/contact-us'
            className='mt-4 inline-block px-8 py-3 bg-[#553f26] text-white font-semibold rounded-sm shadow-lg transition-colors duration-300'
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
