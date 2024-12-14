import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "main-gradient":
          "radial-gradient(130% 120% at 85% -10%, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)",
        "golden-gradient":
          "linear-gradient(74deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)",
        "blue-gradient":
          "linear-gradient(74deg, #4599DB -6.8%, #AADAFF 16.76%, #ABFFFD 30.5%, #4599DB 49.6%, #AADAFF 78.56%, #ABFFFD 89.01%, #4599DB 100.43%)",
      },
    },
  },
  plugins: [],
};
export default config;
