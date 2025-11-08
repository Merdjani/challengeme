const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Exclude MetaQuotes directories
config.resolver = {
  ...config.resolver,
  blockList: [
    /.*MetaQuotes.*/,
    /.*\\MetaQuotes.*/,
    /.*\/MetaQuotes.*/,
  ],
};

module.exports = config;

