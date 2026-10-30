const { defineConfig } = require('eslint/config');
const expo = require('eslint-config-expo/flat');
module.exports = defineConfig([expo, { ignores: ['dist/**', 'coverage/**', '.validation/**', '.jest-cache/**', '.tmp/**'] }]);
