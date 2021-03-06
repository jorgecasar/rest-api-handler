module.exports = {
    extends: [
        '@socifi',
    ],
    plugins: [
        'typescript', // fix for Webstorm, otherwise it does not parse ts files
    ],
    rules: {
        'unicorn/catch-error-name': [2, { name: 'exception' }],
    },
};
