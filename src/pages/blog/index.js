import BlogBanner from '@/components/BlogBanner';
import BlogSection from '@/components/BlogSection';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import React from 'react';

function blogs() {
  return (
    <div>
      <NavbarHero />
      <BlogBanner />
      <BlogSection />
      <BookingSection />
      <Footer />
    </div>
  );
}

export default blogs;
