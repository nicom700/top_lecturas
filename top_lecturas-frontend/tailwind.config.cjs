/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: '#471AA0',
            primaryHover: '#6535D5',
            primaryActive: '#300f70',
            primaryDark: '#a970ff',

            primaryHoverDark: '#bf94ff',
            primaryActiveDark: '#300f70',

            bgDarkPrimary: '#0e0e10',
            bgDarkSecondary: '#18181b',
            bgItemDark: '#2f2f35',
            bgMenuDark: '#1f1f23',

            DarkBtn: '#9147ff',
            DarkBtnHover: '#5c16c5',
            DarkBtnActive: '#4900b5',
        }
    },
  },
  plugins: [],
  darkMode: 'class',
}
