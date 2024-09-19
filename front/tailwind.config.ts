import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "first-color" : "#FFF5EB",
        "second-color": "#4D8DA1",
        "third-color" : "#92D6BB",
         
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #23516B 60%, #49918F 30%, #5F6E9E 10%)",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
