import type { AppProps } from 'next/app';
import Script from 'next/script';
import '@/app/globals.css';
import RootLayout from './layout';

export default function Myapp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.MAP_KEY}`}
      ></Script>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}
