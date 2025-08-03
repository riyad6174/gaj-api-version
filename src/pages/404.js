import Footer from '@/components/Footer';
import NavbarHero from '@/components/NavbarHero';
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex flex-col min-h-screen bg-gray-900'>
      <NavbarHero />
      <main className='flex-grow flex items-center justify-center'>
        <div className='text-center p-8 bg-gray-800 rounded-lg shadow-xl max-w-md mx-auto'>
          <h1 className='text-6xl font-extrabold text-red-500 mb-4'>404</h1>
          <p className='text-xl text-gray-300 mb-6'>
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push('/')}
            className='bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200'
          >
            Go to Homepage
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
