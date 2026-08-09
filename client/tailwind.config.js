/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        purple: {
          primary: '#8b5cf6',
          mid:     '#7c3aed',
          light:   '#a78bfa',
        }
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 45%, #ec4899 100%)',
      },
      animation: {
        'pulse-slow':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':       'float 6s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      {
        purplenight: {
          "primary":   "#8b5cf6",
          "secondary": "#7c3aed",
          "accent":    "#ec4899",
          "neutral":   "#1e1b2e",
          "base-100":  "#030712",
          "base-200":  "#0a0518",
          "base-300":  "#130d28",
          "info":      "#06b6d4",
          "success":   "#34d399",
          "warning":   "#fbbf24",
          "error":     "#f87171",
        },
      },
    ],
    defaultTheme: "purplenight",
  },
};

