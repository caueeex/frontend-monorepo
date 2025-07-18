const path = require('path');

module.exports = function override(config, env) {
  // Configuração para suportar React Native Web
  config.resolve.extensions = [
    '.web.js',
    '.web.jsx',
    '.web.ts',
    '.web.tsx',
    ...config.resolve.extensions,
  ];

  return config;
}; 