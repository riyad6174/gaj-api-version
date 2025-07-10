import Image from 'next/image';
import { Instagram, Facebook, Linkedin, ArrowUp, Youtube } from 'lucide-react';
import Link from 'next/link';
import BottomBookNow from './BottomBookNow';

export default function Footer() {
  return (
    <footer className='bg-black text-white py-10 relative'>
      <div className='container mx-auto px-6 md:px-0 lg:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-20 items-center'>
          {/* Left Section: Logo & Social Media */}
          <div className='text-center md:text-left flex flex-col items-center md:items-center justify-center'>
            <div className='w-60 h-32 md:w-72 md:h-32  overflow-hidden'>
              <Image
                src='/assets/img/footer.png'
                alt='gaj Logo'
                width={1000}
                height={1000}
              />
            </div>
            {/* <h3 className='text-xl font-semibold text-yellow-600 mt-4 uppercase'>
              Gaj Retreats
            </h3> */}
            {/* Social Icons */}
            <div className='flex justify-center md:justify-start space-x-4 mt-4'>
              <a
                href='https://www.instagram.com/gajretreat'
                className='hover:text-yellow-500 transition'
              >
                <Instagram size={24} />
              </a>
              <a
                href='https://www.facebook.com/gajresort/'
                className='hover:text-yellow-500 transition'
              >
                <Facebook size={24} />
              </a>
              <a
                href='https://www.youtube.com/@gajretreat'
                className='hover:text-yellow-500 transition'
              >
                <Youtube size={24} />
              </a>
              <a
                href='https://wa.me/message/SQ3IPGYUV7W6F1'
                className='hover:text-yellow-500 transition'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='currentColor'
                  class='bi bi-whatsapp'
                  viewBox='0 0 16 16'
                >
                  <path d='M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232' />
                </svg>
              </a>
              <a
                target='_blank'
                href='https://www.tripadvisor.in/Hotel_Review-g1162271-d10253332-Reviews-Gaj_Retreat_Manaswal-Hoshiarpur_Hoshiarpurr_District_Punjab.html'
              >
                <img src='/assets/trip.svg' alt='' className='w-7' />
              </a>
            </div>
          </div>

          {/* Middle Section: Contact Information */}
          <div className='text-left md:text-left'>
            <h3 className='text-xl font-semibold text-[#86633a]  border-l-8 pl-2'>
              Reach Us
            </h3>
            <p className='mt-2'>
              V & P.O. Garhi Manaswal, Tehsil Garhshanker, Distt Hoshiarpur,
              Punjab 144523, India.
            </p>
            <p className='mt-2'>
              <a href='tel:+91 8146993104'>T : +91 8146993104</a>
            </p>
            <p>
              Delhi Office : <a href='tel:+91 8968743104'>+91 8968743104</a>{' '}
            </p>
            <p>
              Panjab Office :<a href='tel:+91 8968713104'>+91 8968713104</a>{' '}
            </p>
            <p className='mt-2'>
              <a
                href='mailto:info.gajresort@radissonindividuals.com'
                className='hover:text-yellow-500 transition'
              >
                info.gajresort@radissonindividuals.com
              </a>
            </p>
          </div>

          {/* Right Section: Membership Info */}
          <div className='text-center md:text-right pt-6'>
            <div className='flex items-center justify-center md:justify-end'>
              <img src='/assets/img/RI_logo.png' alt='' className='w-52' />
            </div>
            <ul className='flex flex-wrap items-center gap-4 justify-center md:justify-end pt-10'>
              <li>
                <Link href={'/gallery'}>Gallery</Link>
              </li>
              <li>
                <Link href={'/about-us'}>About Us</Link>
              </li>
              <li>
                <Link href={'/blog'}>Blogs</Link>
              </li>
              <li>
                <Link href={'/itineraries'}>Signature Itineraries</Link>
              </li>
              <li>
                <Link href={'/testimonials'}>Testimonials</Link>
              </li>
              <li>
                <Link href={'/privacy-policy'}>Privacy & Policies</Link>
              </li>
              <li>
                <Link href={'/resort-policies'}>Resort Policies</Link>
              </li>
              <li>
                <Link href={'/terms-and-conditions'}>Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400'>
          Copyright © 2025 Gaj Retreats. A MEMBER OF RADISSON INDIVIDUALS. All
          rights reserved.
        </div>
        <Link
          href={'https://wa.me/message/SQ3IPGYUV7W6F1'}
          target='_blank'
          className='fixed z-50 bottom-26 md:bottom-26 right-6 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-800 transition cursor-pointer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='26'
            height='26'
            fill='currentColor'
            class='bi bi-whatsapp'
            viewBox='0 0 16 16'
          >
            <path d='M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232' />
          </svg>
        </Link>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='fixed z-50 bottom-12 right-6 bg-[#553f26] text-white p-2 rounded-full shadow-lg hover:bg-yellow-800 transition cursor-pointer'
        >
          <ArrowUp size={24} />
        </button>

        <BottomBookNow />
      </div>
    </footer>
  );
}
