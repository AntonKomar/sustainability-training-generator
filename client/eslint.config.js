import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config({
  files: ['**/*.{ts,tsx}'],
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.git/**',
    '**/coverage/**',
    '**/public/**',
    'vite.config.ts',
  ],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: ['./tsconfig.app.json', './tsconfig.node.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
    import: importPlugin,
    'jsx-a11y': jsxA11yPlugin,
    prettier: prettierPlugin,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...tseslint.configs.recommendedTypeChecked.rules,
    ...tseslint.configs.stylisticTypeChecked.rules,
    ...reactPlugin.configs.recommended.rules,
    ...reactPlugin.configs['jsx-runtime'].rules,
    ...reactHooksPlugin.configs.recommended.rules,
    ...prettierPlugin.configs.recommended.rules,
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
  },
  extends: [eslintConfigPrettier],
});
