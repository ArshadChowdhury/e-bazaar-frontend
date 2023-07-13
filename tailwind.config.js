/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      'dark-sky': '#2F80ED',
      'mixed-sky': '#2568C1',
      'dark-gray': '#252C32',
      'mid-gray': '#777777',
      'light-gray': '#E5E9EB',
      'light-white': '#F7F7F7',
      'dark-white': '#F8FBFF',
    },
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
}