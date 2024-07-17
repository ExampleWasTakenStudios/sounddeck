module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:react/recommended',
        "plugin:react/jsx-runtime",
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        EXPERIMENTAL_useProjectService: true,
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['react', 'react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

        'prettier/prettier': ['error', {}, { usePrettierrc: true }],

        'no-unused-vars': 'off', // Ensure eslint doesn't care about unused variables.
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
            },
        ],

        // The rules below are proposed to best leverage eslint's capabilities and reduce work during code review.
        'no-await-in-loop': 'error', // possible performance impact - see: https://eslint.org/docs/latest/rules/no-await-in-loop
        'no-constructor-return': 'error', // Returing values from constructors is bad practice and can be confusing as constructors always return the object they instantiated (this).
        'no-self-compare': 'error', // Saves time during code review .(https://eslint.org/docs/latest/rules/no-self-compare)
        'no-unreachable-loop': 'error', // Saves time during code review by preventing unecessary one-time-loops. (https://eslint.org/docs/latest/rules/no-unreachable-loop)
        'no-console': 'warn', // Using winston should be preferred over direct console.log statements.
    },
};
