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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
        filledIcon: 'var(--filledIcon)',
        innerContainerColor: 'var(--innerContainerColor)',
      },
      fontFamily: {
        sans: ['Pretendard', 'S-CoreDream', 'Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
