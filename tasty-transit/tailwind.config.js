/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}", "./src/**/*.astro"],
  theme: {
    extend: {
      colors: {
        'midnight-violet': '#171123',
        'dark-amethyst': '#372248',
        'tiger-flame': '#f46036',
        'dusty-denim': '#5b85aa',
        'twilight-indigo': '#414770',
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}