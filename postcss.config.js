module.exports = {
  map: true,
  plugins: {
    'postcss-import': {},
    'postcss-color-function': {
      preserveCustomProps: true
    },
    'cssnano': {},
    'postcss-custom-media': {},
  },
  'from': 'src/styles/style.css'
}