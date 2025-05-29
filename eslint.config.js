import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import pluginSort from 'eslint-plugin-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
    },
    pluginSort.configs['flat/recommended'],
    {
        files: ['**/index.ts'],
        rules: {
            'sort/exports': [
                'error',
                {
                    caseSensitive: false,
                    groups: [],
                    natural: true,
                    typeOrder: 'preserve',
                },
            ],
        },
    },
    {
        rules: {
            'sort/imports': [
                'warn',
                {
                    groups: [
                        { order: 10, type: 'side-effect' },
                        { order: 20, type: 'dependency' },
                        { order: 30, type: 'other' },
                    ],
                    separator: '\n',
                },
            ],
            'sort/object-properties': 'off',
        },
    }
)
