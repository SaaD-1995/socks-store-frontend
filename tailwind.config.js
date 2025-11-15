/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Parkinsans", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#000000",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F3F4F6",
          foreground: "#1F2937",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#6B7280",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1F2937",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1F2937",
        },
        purple: {
          600: "#8B5CF6",
        },
        pink: {
          600: "#EC4899",
        },
        black: {
          900: "#000000",
        },
      },
    },

  },
  plugins: [],
}
