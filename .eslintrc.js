module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
    ],
    env: {
        node: true,
    },
    rules: {
        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
        'linebreak-style': ['error', 'unix', 'windows'],
        quotes: [2, 'single'],
        camelcase: 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                leadingUnderscore: 'allow',
                prefix: ['I'],
                format: ['StrictPascalCase']
            }
        ]
    }
};