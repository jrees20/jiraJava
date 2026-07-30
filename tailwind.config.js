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
      colors: {
        primary: '#0052CC',
        success: '#216E4E',
        'success-dark': '#4BCE97',
        warning: '#974F0C',
        'warning-dark': '#F5CD47',
        danger: '#AE2A19',
        'danger-dark': '#F87462',
        neutral: {
          50: '#F7F8F9',
          100: '#F1F2F4',
          200: '#DFE1E6',
          300: '#626F86',
          400: '#44546F',
          500: '#22242F',
        },
        'dark-neutral': {
          50: '#161A1D',
          100: '#22242F',
          200: '#44546F',
          300: '#738496',
          400: '#DFE1E6',
          500: '#F1F2F4',
        },
      },
      spacing: {
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
      },
      fontSize: {
        'heading-1': ['28px', { lineHeight: '32px', fontWeight: '700' }],
        'heading-2': ['24px', { lineHeight: '28px', fontWeight: '600' }],
        'heading-3': ['20px', { lineHeight: '24px', fontWeight: '600' }],
        'heading-4': ['16px', { lineHeight: '20px', fontWeight: '600' }],
        'body': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'small': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'code': ['12px', { lineHeight: '16px', fontWeight: '500' }],
      },
      boxShadow: {
        'elevation-0': 'none',
        'elevation-1': '0 1px 1px rgba(0,0,0,0.13), 0 0 1px rgba(0,0,0,0.15)',
        'elevation-2': '0 4px 8px -2px rgba(0,0,0,0.13), 0 0 1px rgba(0,0,0,0.15)',
        'elevation-3': '0 12px 24px -6px rgba(0,0,0,0.13), 0 0 1px rgba(0,0,0,0.15)',
        'elevation-4': '0 20px 32px -8px rgba(0,0,0,0.13), 0 0 1px rgba(0,0,0,0.15)',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        150: '150ms',
        200: '200ms',
      },
    },
  },
  plugins: [],
}
