import '@/app/globals.css';
import Script from 'next/script';
import RootLayout from './layout';
import type { AppProps } from 'next/app';

export default function Myapp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_KEY}&submodules=clustering`}
      ></Script>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}
