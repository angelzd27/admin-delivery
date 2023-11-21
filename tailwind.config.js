/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yummy: {
          400: '#FEAAAC',
          600: '#FE8285',
          800: '#FC5458'
        },
        status: {
          pending: {
            light: '#E18100',
            dark: '#FFE9CE'
          },
          onProcess: {
            light: '#2D63FF',
            dark: '#D4E8FF'
          },
          completed: {
            light: '#11A100',
            dark: '#D0FFC2'
          },
          rejected: {
            light: '#FF5757',
            dark: '#FFB2B2'
          },
          cancelled: {
            light: '#FF5757',
            dark: '#FFB2B2'
          },
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwindcss-animated')
  ],
}