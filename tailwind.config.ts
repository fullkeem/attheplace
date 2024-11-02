import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: '375px',
        desktop: '1024px',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(180deg, #EBEEF2 0%, #CBCFD6 15%, #99A0A9 30%, #777E88 45%, #545961 60%, #383B40 75%, #1D1F21 100%)',
        'custom-gradient-reverse':
          'linear-gradient(180deg, #1D1F21 0%, #383B40 15%, #545961 30%, #777E88 45%, #99A0A9 60%, #CBCFD6 75%, #EBEEF2 100%)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-inria)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
