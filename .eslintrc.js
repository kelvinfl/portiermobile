// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  ignorePatterns: ['/dist/*', '/node_modules/*', '/android/*', '/ios/*', '/.tamagui/*'],
  rules: {
    'prettier/prettier': 'error',
  },
};
