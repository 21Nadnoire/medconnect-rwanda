import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  module.exports = {
    env: {
      node: true, // Enable Node.js environment for server files
      es2021: true, // Enable ES2021 syntax for modern JavaScript
    },
    globals: {
      process: 'readonly', // Explicitly define 'process' as a global
    },
    parserOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      sourceType: 'module', // Use ES module syntax
    },
    rules: {
      'no-undef': 'error', // Throw an error on undefined variables
    },
  }
]
