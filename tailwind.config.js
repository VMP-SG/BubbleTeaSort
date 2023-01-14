/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "primary": ["Comfortaa_400Regular"],
        "primary-bold": ["Comfortaa_700Bold"],
        "primary-light": ["Comfortaa_300Light"],
        "secondary": ["Raleway_400Regular"],
        "secondary-bold": ["Raleway_700Bold"]
      }
    },
  },
  plugins: [],
};
