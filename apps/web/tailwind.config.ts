import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        panel: '#111c33',
        accent: '#38bdf8',
      },
    },
  },
  plugins: [],
} satisfies Config;
