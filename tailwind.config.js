module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "poker-green": "#076324",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
