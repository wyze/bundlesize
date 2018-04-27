module.exports = {
  extends: ['prettier', 'standard'],
  plugins: ['prettier', 'node'],
  rules: {
    'no-useless-escape': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
      },
    ],
  },
};
