module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        parser: '@typescript-eslint/parser'
    },
    plugins: [
        'vue',
        '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@vue/airbnb'
    ],
    rules: {
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'vue/valid-define-props': 'off',
        'linebreak-style': ['error', 'windows'],
    }
}
