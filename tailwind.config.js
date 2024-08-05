/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 'color-bg-2': 'var(--color-bg-2)',
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
