import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import GallaryBanner from '@/components/GallaryBanner';
const GalleryGrid = dynamic(() => import('@/components/GallaryGrid'), {
  ssr: false,
});
import NavbarHero from '@/components/NavbarHero';
import React from 'react';

function Gallary() {
  return (
    <div>
      <NavbarHero />
      <GallaryBanner />
      <GalleryGrid />
      <Footer />
    </div>
  );
}

export default Gallary;
