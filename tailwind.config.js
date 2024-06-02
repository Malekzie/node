/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  puge: ["./**/*.ejs"],
  content: [
    './src/views/**/*.ejs'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      'retro',
      'luxury',
    ]
  },
}

