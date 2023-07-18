module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['plugin:vue/vue3-recommended', 'eslint:recommended'],
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['vue', 'html'],
    rules: {
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-indent': ['error', 2,
            {
                'attribute': 1,
                'baseIndent': 1,
                'closeBracket': 0,
                'alignAttributesVertically': true,
                'ignores': []
            }],
        'vue/max-attributes-per-line': ['error', {
            'singleline': {
                'max': 3,
            },
            'multiline': {
                'max': 1,
            }
        }],
        'vue/require-v-for-key': 'warn',
        // 'no-console': ['error', {allow: ['warn', 'error', 'info']}],
        camelcase: 'warn',
        semi: ['error', 'never'],
        quotes: ['error', 'single', {'avoidEscape': true}]
    },
};
