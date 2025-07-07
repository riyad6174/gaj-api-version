'use client';

import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import React from 'react';

export default function TermsAndConditions() {
  return (
    <>
      <NavbarHero />
      <section className='py-30 bg-gray-50'>
        <div className='container mx-auto px-6 md:px-12 lg:px-20'>
          {/* Page Header */}
          <div className='text-center mb-10'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
              Terms and Conditions
            </h2>
            <div className='mt-2 flex justify-center items-center'>
              <span className='h-[2px] w-16 bg-gray-400'></span>
              <span className='mx-2 text-gray-500 text-lg'>✿</span>
              <span className='h-[2px] w-16 bg-gray-400'></span>
            </div>
          </div>

          {/* Terms and Conditions Content */}
          <div className='space-y-6'>
            {/* Disclaimer */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Disclaimer
              </h3>
              <p className='mt-4 text-gray-600'>
                The information contained in this website is for general
                information purposes only. The information is provided by Gaj
                Retreat and while we endeavor to keep the information up to date
                and correct, we make no representations or warranties of any
                kind, express or implied, about the completeness, accuracy,
                reliability, suitability, or availability with respect to the
                website or the information, products, services, or related
                graphics contained on the website for any purpose. Any reliance
                you place on such information is therefore strictly at your own
                risk. Some logos being used in the website are properties of
                their respective owners. We have used the logo only to share
                information about corporate events being conducted at Gaj
                Retreat.
              </p>
            </div>

            {/* Arrival and Departure Policy */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Arrival and Departure Policy
              </h3>
              <p className='mt-4 text-gray-600'>
                <strong>Check-in:</strong> 1400 Hours. Early arrival is subject
                to availability. For guaranteed early check-in, reservation
                needs to be made starting from the previous night.
              </p>
              <p className='mt-2 text-gray-600'>
                <strong>Check-out:</strong> 1200 Hours. Late check-outs are
                available on request and subject to availability.
              </p>
              <p className='mt-2 text-gray-600'>
                <strong>Identity Proof:</strong> In keeping with Government
                regulations, we request all guests (on single/double/triple
                occupancy) to carry a photo identity to present on check-in.
                Foreign nationals are required to present their valid passport
                and visa. Indian nationals can present any government-issued
                photo identity address proof card, e.g., driving license,
                passport, Aadhar card, or voter’s ID card. PAN Card will not be
                accepted as the above. Also, do keep handy proof of corporate
                affiliations, if you have made a corporate booking.
              </p>
            </div>

            {/* Guarantee Policy */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Guarantee Policy
              </h3>
              <p className='mt-4 text-gray-600'>
                All bookings must be guaranteed at the time of reservation by a
                Credit Card. All major credit cards are accepted.
              </p>
            </div>

            {/* Cancellation Policy */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Cancellation Policy
              </h3>
              <ul className='mt-4 text-gray-600 list-disc list-inside space-y-2'>
                <li>Less than 10 days before the arrival date – No refund</li>
                <li>Less than 20 days before the arrival date – 60% refund</li>
                <li>Less than 25 days before the arrival date – 75% refund</li>
                <li>
                  No refund in case of road block, accident, no show, etc.
                </li>
              </ul>
            </div>

            {/* Refund Policy */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Refund Policy
              </h3>
              <p className='mt-4 text-gray-600'>
                Upon receiving the request for cancellation from the guest (as
                per cancellation/no show policy), the hotel will immediately
                contact the bank to handle the crediting process. The refund
                will be made through the credit card used to purchase. In a
                normal scenario, the refunded amount shall reflect in the next
                billing cycle of the credit card. However, it could take around
                30-45 business days for the actual crediting to take place
                depending on the bank’s practice.
              </p>
            </div>

            {/* Guarantee and Cancellation Policy for Groups */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Guarantee and Cancellation Policy (for Groups of 5 Rooms or
                More)
              </h3>
              <p className='mt-4 text-gray-600'>
                We will be happy to confirm group reservations against an
                advance or on receipt of a valid credit card number and card
                expiry date.
              </p>
              <p className='mt-2 text-gray-600'>
                For room reservations, we understand that plans change
                sometimes. If you need to cancel/reduce/amend a guaranteed
                reservation, please do so 30 days prior to arrival. In case
                there is any no-show or cancellation/amendment of the
                conference/group (in part or full), within 30 days or less from
                the date of check-in, a retention charge will become due as
                under:
              </p>
              <p className='mt-2 text-gray-600'>
                Number of rooms being cancelled/no-shows × 1 night × applicable
                daily rate per room, including taxes. In addition, should any
                participants check out early, retention will be charged for
                those nights booked, now being released due to the early
                check-out. Bookings made on non-cancellable/non-amendable
                packages/rates cannot be cancelled/amended. On doing so, the
                full amount of advance paid will be treated as the cancellation
                fee.
              </p>
            </div>

            {/* Child/Extra Adult Policy */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Child/Extra Adult Policy
              </h3>
              <ul className='mt-4 text-gray-600 list-disc list-inside space-y-2'>
                <li>
                  Children up to 5 years of age are entitled to a complimentary
                  stay.
                </li>
                <li>
                  Children between 5–12 years will be charged Rs.3000 per night
                  with extra bed and meals.
                </li>
                <li>
                  Above 12 years of age – Rs.5000 per night with extra bed and
                  meals.
                </li>
              </ul>
            </div>

            {/* Policy Revision */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Policy Revision
              </h3>
              <p className='mt-4 text-gray-600'>
                Gaj Retreat reserves its rights to revise this policy from time
                to time at its discretion with a view to making the policy more
                user-friendly.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
