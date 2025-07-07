// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';

// const images = [
//   '/assets/img/adv1.webp',
//   '/assets/img/adv2.webp',
//   '/assets/img/golf.webp',
//   '/assets/img/river.webp',
//   '/assets/img/slider3.webp',
//   '/assets/img/slider4.webp',
//   '/assets/img/slider5.webp',
//   '/assets/img/slider2.webp',
//   '/assets/img/room.webp',
//   '/assets/img/room.webp',
// ];

// export default function GalleryGrid() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [photoIndex, setPhotoIndex] = useState(null); // Set initial value as null

//   const openLightbox = (index) => {
//     setPhotoIndex(index); // First, update the photo index
//     setTimeout(() => setIsOpen(true), 50); // Then, slightly delay opening lightbox
//   };

//   return (
//     <>
//       <section className='py-16 bg-white'>
//         <div className='container mx-auto px-6 md:px-12 lg:px-20'>
//           {/* Section Title */}
//           <div className='text-center'>
//             <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
//               Gallery
//             </h2>
//             <div className='mt-2 flex justify-center items-center'>
//               <span className='h-[2px] w-16 bg-gray-400'></span>
//               <span className='mx-2 text-gray-500 text-lg'>✿</span>
//               <span className='h-[2px] w-16 bg-gray-400'></span>
//             </div>
//           </div>

//           {/* Gallery Grid - Alternating 3 and 4 column layouts */}
//           <div className='mt-10 space-y-3'>
//             {/* First row - 3 columns */}
//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
//               {images.slice(0, 3).map((src, index) => (
//                 <div
//                   key={index}
//                   className='relative cursor-pointer overflow-hidden  shadow-md hover:shadow-lg'
//                   onClick={() => openLightbox(index)}
//                 >
//                   <Image
//                     src={src}
//                     alt={`Gallery Image ${index + 1}`}
//                     width={400}
//                     height={300}
//                     className='object-cover w-full h-full transition-transform transform hover:scale-105'
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Second row - 4 columns */}
//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'>
//               {images.slice(3, 7).map((src, index) => (
//                 <div
//                   key={index + 3}
//                   className='relative cursor-pointer overflow-hidden  shadow-md hover:shadow-lg'
//                   onClick={() => openLightbox(index + 3)}
//                 >
//                   <Image
//                     src={src}
//                     alt={`Gallery Image ${index + 4}`}
//                     width={400}
//                     height={300}
//                     className='object-cover w-full h-full transition-transform transform hover:scale-105'
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Third row - 3 columns */}
//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
//               {images.slice(7, 10).map((src, index) => (
//                 <div
//                   key={index + 7}
//                   className='relative cursor-pointer overflow-hidden -lg shadow-md hover:shadow-lg'
//                   onClick={() => openLightbox(index + 7)}
//                 >
//                   <Image
//                     src={src}
//                     alt={`Gallery Image ${index + 8}`}
//                     width={400}
//                     height={300}
//                     className='object-cover w-full h-full transition-transform transform hover:scale-105'
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Lightbox Preview */}
//         {isOpen && photoIndex !== null && (
//           <Lightbox
//             mainSrc={images[photoIndex]}
//             nextSrc={images[(photoIndex + 1) % images.length]}
//             prevSrc={images[(photoIndex + images.length - 1) % images.length]}
//             onCloseRequest={() => setIsOpen(false)}
//             onMovePrevRequest={() =>
//               setPhotoIndex((photoIndex + images.length - 1) % images.length)
//             }
//             onMoveNextRequest={() =>
//               setPhotoIndex((photoIndex + 1) % images.length)
//             }
//             reactModalStyle={{ overlay: { zIndex: 50 } }}
//           />
//         )}
//       </section>
//     </>
//   );
// }

import React from 'react';

function GallaryGridBackUp() {
  return <div>GallaryGridBackUp</div>;
}

export default GallaryGridBackUp;
