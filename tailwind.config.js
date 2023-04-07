/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        lilac: "#BD5CDE",
        "light-gray": "#f5f5f5",
        "medium-gray": "#D6CFCB",
        "dark-lilac": "#706677",
        "dark-gray": "#565264",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
      boxShadow: {
        "3xl": "0 15px 15px -15px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
