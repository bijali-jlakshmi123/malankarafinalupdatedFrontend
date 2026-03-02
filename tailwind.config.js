/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1025px",
      xl: "1280px",
      "2xl": "1366px",
    },

    extend: {
      colors: {
        primary: {
          DEFAULT: "#76297D",
          hover: "#9B18A7",
        },
        secondary: "#292B2D",
        text: "#334155",
        accent: "#C7A754",
        bg: {
          1: "#FAF9F5",
          2: "#F2F2EC",
          3: "#FFFDE4",
        },
        white: "#FFFFFF",
      },

      fontFamily: {
        primary: ["Prata", "serif"],
        secondary: ["Forum", "serif"],
        body: ["Sarabun", "sans-serif"],
        accent: ["Nunito Sans", "sans-serif"],
      },

      maxWidth: {
        container: "1366px",
      },
    },
  },

  plugins: [],
};
