import playwright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
    tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        ...playwright.configs['flat/recommended'],
        files: ['**/*.ts'],
        rules: {
            ...playwright.configs['flat/recommended'].rules,
            'playwright/no-standalone-expect': 'off',
        },
    },
]);
