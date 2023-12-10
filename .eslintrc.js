module.exports = {
  env: {
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Apply the following rules only to TypeScript files
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      plugins: ['@typescript-eslint'],
      rules: {
        'no-console': 'error', // Disallow the use of console.log, etc.
        'comma-dangle': ['error', 'never'] // Disallow trailing commas
        // Add more rules specific to TypeScript if needed
      }
    },
  ],
  ignorePatterns: ['dist/','*.js', '*.jsx'] // Exclude the dist directory from ESLint checks
};
