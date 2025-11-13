/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbea',
          100: '#fff3c4',
          200: '#ffe58a',
          300: '#ffd449',
          400: '#ffbf1f',
          500: '#ffa500',
          600: '#e27c00',
          700: '#bb5602',
          800: '#984208',
          900: '#7c360b',
        },
        // Agrega esto: tokens semánticos
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Si usas más en tu app, agrégalos aquí (ej. card, popover, etc.)
      },
    },
  },
  plugins: [],
}