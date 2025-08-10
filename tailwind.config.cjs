/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9fb',
          100: '#e0f4f7',
          500: '#06b6d4',
          700: '#0891b2'
        }
      },
      keyframes: {
        sparkle: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-6px) scale(1.02)', opacity: '0.9' }
        },
        sadDrop: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(30px)', opacity: 0 }
        }
      },
      animation: {
        sparkle: 'sparkle 900ms infinite alternate',
        sadDrop: 'sadDrop 1.2s ease-out forwards'
      }
    }
  },
  plugins: []
}
