export default [
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        Audio: 'readonly',
        HTMLAudioElement: 'readonly',
        console: 'readonly',
        define: 'readonly',
        module: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'off',
      semi: ['error', 'never'],
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      'space-before-function-paren': ['error', { named: 'never', anonymous: 'never', asyncArrow: 'always' }]
    }
  }
]
