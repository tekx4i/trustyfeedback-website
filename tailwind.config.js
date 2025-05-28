/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        body: "#17253F",
        blue: {
          25: "#F1F3FF",
          50: "#EAF0F8",
          100: "#F0F1F8",
          200: "#DAE2ED",
          300: "#E4E6F7",
          600: "#4558F9",
          700: "#29378C",
        },
      },
      textColor: {
        body: "#17253F",
        gray: {
          100: "#17253F",
          200: "#2A2A2A",
        },
        red: "#FF0000",
      },
      borderColor: {
        body: "#17253F",
        "light-blue": "#17253F26",
        blue: {
          100: "#D2DBE4",
          600: "#4558F9",
        },
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      height: {
        "custom-height": "calc(100vh - 40px)",
      },
    },
  },
  plugins: [],
};
