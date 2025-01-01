/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#334155',
            h1: {
              color: '#1e293b',
              fontWeight: '800',
            },
            h2: {
              color: '#1e293b',
              fontWeight: '700',
            },
            h3: {
              color: '#1e293b',
              fontWeight: '600',
            },
            strong: {
              color: '#1e293b',
            },
            a: {
              color: '#2563eb',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
            code: {
              color: '#1e293b',
              backgroundColor: '#f1f5f9',
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
              overflow: 'auto',
              padding: '1rem',
              borderRadius: '0.5rem',
              code: {
                backgroundColor: 'transparent',
                padding: '0',
                color: 'inherit',
                fontWeight: '400',
              },
            },
          },
        },
        invert: {
          css: {
            color: '#e2e8f0',
            h1: {
              color: '#f1f5f9',
            },
            h2: {
              color: '#f1f5f9',
            },
            h3: {
              color: '#f1f5f9',
            },
            strong: {
              color: '#f1f5f9',
            },
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            code: {
              color: '#f1f5f9',
              backgroundColor: '#334155',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 