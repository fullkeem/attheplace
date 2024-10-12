import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "375px",
        desktop: "1024px",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, #EBEEF2 0%, #CBCFD6 15%, #99A0A9 30%, #777E88 45%, #545961 60%, #383B40 75%, #1D1F21 100%)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-inria)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
