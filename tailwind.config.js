module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      colors: {
        primary: '#3053ff',
        'primary-a': {
          500: 'rgba(48, 83, 255, 0.5)',
          600: 'rgba(48, 83, 255, 0.6)',
          700: 'rgba(48, 83, 255, 0.7)',
          800: 'rgba(48, 83, 255, 0.8)'
        },
        secondary: '#676972',
        'secondary-a': {
          500: 'rgba(103,105,114,0.5)',
          600: 'rgba(103,105,114,0.6)',
          700: 'rgba(103,105,114,0.7)',
          800: 'rgba(103,105,114,0.8)',
          900: 'rgba(103,105,114,0.9)'
        },
        background: {
          light: '#f8feff',
          dark: '#2b3542'
        },
        'background-l2': {
          light: '#ffffff',
          dark: '#5f6976',
          'dark-a': {
            700: 'rgba(95,105,118,0.7)'
          }
        },
        blueish: '#1fb6ff',
        purple: '#7e5bef',
        pink: '#ff49db',
        orange: '#ff7849',
        greenish: '#13ce66',
        yellow: '#ffc82c',
        'gray-dark': '#273444',
        grayish: '#8492a6',
        'gray-light': '#d3dce6'
      },
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      fontSize: {
        '2xs': '.5rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
