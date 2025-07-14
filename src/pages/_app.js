import '@/styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Push page view event to GTM dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'pageview',
        page: url,
      });
    };
    // Track the initial page load
    handleRouteChange(router.asPath);

    // Track route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up the event listener
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.asPath]);
  return <Component {...pageProps} />;
}
