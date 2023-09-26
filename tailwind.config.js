/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "teal": {
          50: "#EDF2F3",
          100: "#DDE8E9",
          200: "#B8CED0",
          300: "#97B7BA",
          400: "#729EA2",
          500: "#578084",
          600: "#456668",
          700: "#354E50",
          800: "#223334",
          900: "#121B1C",
          950: "#080C0C"
        },
        "ochre": {
          50: "#FEFCF6",
          100: "#FCF7E8",
          200: "#FAF0D6",
          300: "#F8E8BF",
          400: "#F5DFA8",
          500: "#F3D893",
          600: "#EBBE4C",
          700: "#D39E17",
          800: "#8E6A10",
          900: "#453408",
          950: "#251B04"
        }
      }
    },
  },
  plugins: [],
}

