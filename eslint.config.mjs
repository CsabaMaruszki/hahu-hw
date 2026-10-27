import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'blob-report/**',
      '.husky/**',
    ],
  },
  {
    plugins: {
      '@stylistic': stylistic
    },
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      stylistic.configs.recommended
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: { '@stylistic/semi': ['error', 'always'] }
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.ts'],
  },
);
