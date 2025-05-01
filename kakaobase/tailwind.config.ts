import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-in-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        bgColor: 'var(--bgColor)',
        containerColor: 'var(--containerColor)',
        myBlue: 'var(--myBlue)',
        myLightBlue: 'var(--myLightBlue)',
        textOnBlue: 'var(--textOnBlue)',
        textOnLight: 'var(--textOnLight)',
        textColor: 'var(--textColor)',
        redHeart: 'var(--redHeart)',
        iconColor: 'var(--iconColor)',
        innerContainerColor: 'var(--innerContainerColor)',
        textOpacity50: 'var(--textOpacity50)',
      },
      fontFamily: {
        sans: ['Pretendard', 'S-CoreDream', 'Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
