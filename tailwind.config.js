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
      },
      colors: {
        "brown-300": "#FFF3E0",
        "brown-400": "#EADAC1",
        "brown-500": "#CEB195",
        "brown-600": "#B0906F",
        "brown-700": "#7D6347",
        "brown-800": "#57432F",
        "brown-900": "#402F1F",
        "gray": "#D9D9D9",
        "gray-light": "#3E3E3E",
        "gray-light-transparent": "#3E3E3E71"
      }
    },
  },
  plugins: [],
};
