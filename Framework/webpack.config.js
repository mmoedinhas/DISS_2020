const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'story-framework.js',
        library: 'storyFramework',
        libraryTarget: 'umd'
    },

    devtool: 'source-map',

    mode: 'production'
};