'use client';

import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <>
      <NavbarHero />
      <section className='py-30 bg-gray-50'>
        <div className='container mx-auto px-6 md:px-12 lg:px-20'>
          {/* Page Header */}
          <div className='text-center mb-10'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
              Privacy Policy
            </h2>
            <div className='mt-2 flex justify-center items-center'>
              <span className='h-[2px] w-16 bg-gray-400'></span>
              <span className='mx-2 text-gray-500 text-lg'>✿</span>
              <span className='h-[2px] w-16 bg-gray-400'></span>
            </div>
          </div>

          {/* Privacy Policy Content */}
          <div className='space-y-6'>
            {/* Introduction */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Introduction
              </h3>
              <p className='mt-4 text-gray-600'>
                Gaj Retreat respects your privacy and is committed to protecting
                your personal data. This privacy notice sets out information
                about how we treat your personal data, including when you visit
                our website (www.gajretreat.com).
              </p>
              <p className='mt-2 text-gray-600'>
                This privacy notice aims to give you information about how Gaj
                Retreat collects and processes your personal data, including any
                data you may provide through this website when you make a
                booking reservation, purchase another service, subscribe to our
                newsletter, or consent to receive marketing communications.
              </p>
              <p className='mt-2 text-gray-600'>
                This privacy notice should be read together with any other data
                privacy notice or fair processing notices we may provide to you
                from time to time in connection with our processing of your
                personal data for specified purposes.
              </p>
            </div>

            {/* The Data We Collect About You */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                The Data We Collect About You
              </h3>
              <p className='mt-4 text-gray-600'>
                Personal data, or personal information, means any information
                about an individual from which that person can be identified. It
                does not include data where the identity has been removed or
                cannot be revealed and which is classified as anonymous data.
              </p>
              <p className='mt-2 text-gray-600'>
                We may collect, use, store, and transfer different kinds of
                personal data about you which we have grouped together as
                follows:
              </p>
              <ul className='mt-2 text-gray-600 list-disc list-inside space-y-2'>
                <li>
                  <strong>Identity Data:</strong> includes first name, maiden
                  name, last name, username or similar identifier, title, date
                  of birth, gender, nationality, and passport or identification
                  card details.
                </li>
                <li>
                  <strong>Contact Data:</strong> includes billing address, home
                  and business address, email addresses, and telephone numbers.
                </li>
                <li>
                  <strong>Financial Data:</strong> includes bank account and
                  payment card details.
                </li>
                <li>
                  <strong>Transaction Data:</strong> includes details about
                  payments to and from you and other details of booking
                  reservations, services you have purchased from us.
                </li>
                <li>
                  <strong>Technical Data:</strong> includes internet protocol
                  (IP) address, your login data, browser type and version, time
                  zone setting and location, browser plug-in types and versions,
                  operating system and platform, and other technology on the
                  devices you use to access this website.
                </li>
                <li>
                  <strong>Profile Data:</strong> includes your username
                  (identifier email address used to log-in) and password,
                  booking reservations, purchases or orders made by you, your
                  interests, preferences (such as for specific destinations,
                  room types or other requests), feedback, survey responses,
                  company information, etc.
                </li>
                <li>
                  <strong>Usage Data:</strong> includes information about how
                  you use our website and services.
                </li>
                <li>
                  <strong>Marketing and Communications Data:</strong> includes
                  your preferences in receiving marketing from us and our third
                  parties and your communication preferences.
                </li>
              </ul>
              <p className='mt-2 text-gray-600'>
                We may also use and share information which does not directly or
                indirectly reveal your identity, including statistical or
                demographic data (Aggregated Data) for any purpose. However, if
                we combine or connect Aggregated Data with your personal data so
                that it can directly or indirectly identify you, we treat the
                combined data as personal data which will be used in accordance
                with this privacy notice.
              </p>
              <p className='mt-2 text-gray-600'>
                We may in certain circumstances collect and process Special
                Categories of Personal Data about you, including disability and
                health records relevant to your visit (such as food allergies,
                health condition requirements, and hotel accessibility
                requirements) and religious information relevant to your visit
                (such as dietary requirements), in which case we shall only do
                so in accordance with applicable law (which may require that we
                obtain your consent).
              </p>
            </div>

            {/* Failure to Provide Personal Data */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Failure to Provide Personal Data
              </h3>
              <p className='mt-4 text-gray-600'>
                In certain circumstances, we need your personal data to perform
                our obligations to you in connection with the services you
                request from us (for example, to fulfill your booking
                reservation or to provide you with other services) or in order
                to comply with certain legal requirements. If you fail to
                provide information to us, we may not be able to provide you
                with the services you desire. We will of course notify you if
                this is the case.
              </p>
            </div>

            {/* How Your Personal Data is Collected */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                How Your Personal Data is Collected
              </h3>
              <p className='mt-4 text-gray-600'>
                Your personal data is made available to us through various
                methods, including:
              </p>
              <ul className='mt-2 text-gray-600 list-disc list-inside space-y-2'>
                <li>
                  <strong>Direct interactions:</strong> You may give us your
                  Identity, Contact, Financial, Transaction, Profile, and
                  Marketing and Communications Data by filling in forms or by
                  corresponding with us by post, phone, email, or otherwise.
                  This includes personal data you provide when you:
                  <ul className='ml-6 list-circle list-inside space-y-1'>
                    <li>Make a booking reservation;</li>
                    <li>
                      Directly provide it to us at one of The Gaj properties;
                    </li>
                    <li>Create an account on our website;</li>
                    <li>Subscribe to our newsletter or other publications;</li>
                    <li>Request marketing communications be sent to you;</li>
                    <li>Enter a competition, promotion, or survey; or</li>
                    <li>Give us feedback or contact us.</li>
                  </ul>
                </li>
                <li>
                  <strong>Cookies and similar technologies:</strong> As you
                  interact with our website, we will automatically collect
                  Technical Data about your equipment, browsing actions, and
                  patterns. We collect this personal data by using cookies,
                  server logs, and other similar technologies. We may also
                  receive Technical Data about you if you visit other websites
                  employing our cookies. Please refer to our cookie policy for
                  further details.
                </li>
                <li>
                  <strong>Third parties:</strong> We will receive personal data
                  about you from various third parties as set out below:
                  <ul className='ml-6 list-circle list-inside space-y-1'>
                    <li>
                      Identity, Contact, Financial, Transaction, and Profile
                      Data from third parties such as travel agents or other
                      booking partners, booking comparison websites, airline or
                      car rental partners, or loyalty program partners;
                    </li>
                    <li>
                      Identity, Contact, Financial, Transaction, Profile, and
                      Marketing and Communications Data received from our
                      “Associated Hotels”;
                    </li>
                    <li>
                      Technical Data from:
                      <ul className='ml-6 list-square list-inside space-y-1'>
                        <li>
                          Analytics and search information providers such as
                          Google & Bing;
                        </li>
                        <li>
                          Advertising networks such as search engines and social
                          channels;
                        </li>
                      </ul>
                    </li>
                    <li>
                      Contact, Financial, and Transaction Data from providers of
                      technical, payment, and delivery services;
                    </li>
                    <li>
                      Identity and Contact Data from data brokers or
                      aggregators.
                    </li>
                  </ul>
                </li>
              </ul>
              <p className='mt-2 text-gray-600'>
                Our website does not offer products or services for use by
                minors. If you are under 18 years of age, you may use our
                website only with the involvement of a parent or guardian. If
                you are a parent or guardian and you are aware that your child
                has provided us with personal data, please contact us at{' '}
                <a
                  href='mailto:info.gajresort@radissonindividuals.com'
                  className='text-blue-600'
                >
                  info.gajresort@radissonindividuals.com
                </a>{' '}
                for any concern related to the child’s personal data.
              </p>
            </div>

            {/* Contact Information */}
            <div className='md:p-6 text-justify break-words'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Contacting Us
              </h3>
              <p className='mt-4 text-gray-600'>
                If you have any questions about this privacy policy or concerns
                related to your personal data, you may contact us at:
              </p>
              <p className='mt-2 text-gray-600'>
                <strong>Gaj Retreat</strong>
              </p>
              <p className='text-gray-600'>
                Email:{' '}
                <a
                  href='mailto:info.gajresort@radissonindividuals.com'
                  className='text-blue-600'
                >
                  info.gajresort@radissonindividuals.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
