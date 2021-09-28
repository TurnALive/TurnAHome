module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'turna-100': "#74D7D0",
        'turna-200': "#60D1C9",
        'turna-300': '#4CCBC2',
        'turna-400': "#39C5BB",
        'turna-500': '#33B1A8',
        'turna-600': '#2E9D95',
        'turna-700': '#288A83',

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
