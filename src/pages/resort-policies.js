'use client';

import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import React from 'react';

export default function ResortPolicies() {
  return (
    <>
      <NavbarHero />
      <section className='py-30 bg-gray-50'>
        <div className='container mx-auto px-0 md:px-12 lg:px-20'>
          {/* Page Header */}
          <div className='text-center mb-10'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
              Resort Policies
            </h2>
            <div className='mt-2 flex justify-center items-center'>
              <span className='h-[2px] w-16 bg-gray-400'></span>
              <span className='mx-2 text-gray-500 text-lg'>✿</span>
              <span className='h-[2px] w-16 bg-gray-400'></span>
            </div>
          </div>

          {/* Policies */}
          <div className='space-y-6'>
            {/* Arrival & Departure Policy */}
            <div className='p-3 md:p-6 rounded-lg text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Arrival and Departure Policy
              </h3>
              <p className='mt-3 text-gray-600'>
                <strong>Check-in:</strong> 1400 Hours. Early arrival is subject
                to availability. For guaranteed early check-in, reservation
                needs to be made starting from the previous night.
              </p>
              <p className='mt-2 text-gray-600'>
                <strong>Check-out:</strong> 1100 Hours. Late check-outs are
                available on request and subject to availability.
              </p>
            </div>

            {/* Identity Proof */}
            <div className='p-3 md:p-6 rounded-lg text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Identity Proof
              </h3>
              <p className='mt-3 text-gray-600'>
                In compliance with Government regulations, all guests (on
                single/double/triple occupancy) must present a valid photo
                identity upon check-in.
              </p>
              <ul className='mt-2 text-gray-600 list-disc list-inside space-y-2'>
                <li>
                  Foreign nationals must present a valid passport and visa.
                </li>
                <li>
                  Indian nationals can present a Driving License, Passport,
                  Aadhar Card, or Voter’s ID.
                </li>
                <li>PAN Cards will not be accepted.</li>
                <li>
                  For corporate bookings, proof of corporate affiliation must be
                  provided.
                </li>
              </ul>
            </div>

            {/* Guarantee Policy */}
            <div className='p-3 md:p-6 rounded-lg text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Guarantee Policy
              </h3>
              <p className='mt-3 text-gray-600'>
                All bookings must be guaranteed with a valid Credit Card at the
                time of reservation. We accept all major credit cards.
              </p>
            </div>

            {/* Cancellation Policy */}
            <div className='p-3 md:p-6 rounded-lg text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Cancellation Policy
              </h3>
              <ul className='mt-3 text-gray-600 list-disc list-inside space-y-2'>
                <li>Less than 5 days before arrival – No refund.</li>
                <li>Less than 10 days before arrival – 75% refund.</li>
                <li>No refund in case of roadblocks, accidents, or no-show.</li>
              </ul>
            </div>

            {/* Refund Policy */}
            <div className='p-3 md:p-6 rounded-lg text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Refund Policy
              </h3>
              <p className='mt-3 text-gray-600'>
                Upon cancellation (as per our policy), the hotel will
                immediately process the crediting request.
              </p>
              <ul className='mt-2 text-gray-600 list-disc list-inside space-y-2'>
                <li>
                  The refund will be made via the same credit card used for
                  booking.
                </li>
                <li>
                  It may take **30-45 business days** for the refund to reflect,
                  depending on the bank’s processing time.
                </li>
              </ul>
            </div>

            {/* Group Bookings Policy */}
            <div className='p-3 md:p-6 rounded-lg text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Group Booking Policy (5+ Rooms)
              </h3>
              <p className='mt-3 text-gray-600'>
                Group reservations require an advance payment or a valid credit
                card guarantee. Cancellation charges apply if canceled within 30
                days before arrival.
              </p>
              <p className='mt-2 text-gray-600'>
                **No-show/cancellation charges:** Number of rooms canceled × 1
                night × daily rate (including taxes).
              </p>
            </div>

            {/* Child & Extra Adult Policy */}
            <div className='p-3 md:p-6 rounded-lg text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Child & Extra Adult Policy
              </h3>
              <ul className='mt-3 text-gray-600 list-disc list-inside space-y-2'>
                <li>Children up to **5 years** – Complimentary stay.</li>
                <li>
                  Children **5-12 years** – Rs.1000 per night (extra bed
                  included).
                </li>
                <li>
                  Above **12 years** – Rs.1500 per night (extra bed included).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
