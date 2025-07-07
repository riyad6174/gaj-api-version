'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import BookingForm from './BookingForm';

// Import Swiper styles
import 'swiper/css';

export default function HeroSection() {
  const [weather, setWeather] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isTextVisible, setIsTextVisible] = useState(true);

  // 31.2924962081293, 76.28929090217952;
  const lat = 31.2924962081293; // Latitude for the location
  const lon = 76.28929090217952; // Longitude for the location
  const apiKey = '5197cfa96d48d1ac9193a31879740301'; // Replace with your OpenWeatherMap API key

  useEffect(() => {
    const fetchWeather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.main) {
          setWeather({
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          });
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  // Handle video end
  const handleVideoEnd = () => {
    setVideoEnded(true);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start(); // Start slider autoplay after video ends
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(false);
    }, 5000); // 4 seconds (change to 5000 for 5 seconds)

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <section className='relative h-[400px] md:h-[650px] flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/30 z-10'></div>

      {/* Swiper Slider */}
      <div className='absolute inset-0 overflow-hidden'>
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // Assign refs to swiper navigation before initialization
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          autoplay={
            videoEnded ? { delay: 5000, disableOnInteraction: false } : false
          }
          loop={true}
          className='w-full h-full'
        >
          {/* Video Slide (Shown First) */}
          {!videoEnded && (
            <SwiperSlide>
              <video
                src='/assets/home/main.mp4'
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className='w-full h-full object-cover'
              />
            </SwiperSlide>
          )}

          {/* Image Slides (Shown After Video Ends) */}
          <SwiperSlide>
            <img
              src='/assets/home/home-banner-1.jpg'
              alt='Banner 1'
              className='w-full h-full object-cover'
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src='assets/home/home-banner-2.jpg'
              alt='Banner 2'
              className='w-full h-full object-cover'
            />
          </SwiperSlide>
          {/* <SwiperSlide>
            <img
              src='/assets/home/banner3.jpg'
              alt='Banner 3'
              className='w-full h-full object-cover'
            />
          </SwiperSlide> */}
        </Swiper>
      </div>

      {/* Hero Content */}
      <div
        className={`relative z-20 text-center text-white px-4 mt-10 md:mb-0 transition-opacity duration-1000 ${
          isTextVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className='mt-1 md:mt-2 text-base md:text-2xl'>
          An Uninhibited Celebration of
        </p>
        <h1 className='text-3xl md:text-6xl font-bold'>Exotica & Adventure</h1>
      </div>

      {/* Weather Information */}
      {weather && (
        <div className='absolute z-30 top-20 px-2 right-2 md:top-28 md:right-10 bg-black/50 text-white md:px-4 md:py-1 rounded-lg flex items-center space-x-3'>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
            alt='Weather Icon'
            className='w-8 h-8'
          />
          <div className='flex items-center gap-3'>
            <p className='text-lg font-semibold'>
              {' '}
              {Math.round(weather.temperature)}°C
            </p>
            <p className='text-sm'>{weather.description}</p>
            <div className='text-sm flex items-center gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-geo-alt'
                viewBox='0 0 16 16'
              >
                <path d='M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10' />
                <path d='M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6' />
              </svg>
              <span>Hoshiarpur</span>
            </div>
          </div>
        </div>
      )}

      {/* Custom Carousel Arrows */}
      <button
        ref={prevRef}
        className='absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition z-30'
      >
        <ChevronLeft className='w-6 h-6' />
      </button>
      <button
        ref={nextRef}
        className='absolute right-4 md:right-10 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition z-30'
      >
        <ChevronRight className='w-6 h-6' />
      </button>

      {/* Booking Form (Overlapping Section) */}
      <BookingForm />
    </section>
  );
}
