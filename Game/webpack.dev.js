const merge = require('webpack-merge');
const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');
dotenv.config();

module.exports = merge(common, {

    entry: {
        app: './src/main-dev.ts',
        vendors: ['phaser']
    },

    output: {
        path: path.resolve(__dirname, 'dist')
    },

    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new CopyWebpackPlugin([{
                from: path.resolve(__dirname, 'index.html'),
                to: path.resolve(__dirname, 'dist')
            },
            {
                from: path.resolve(__dirname, 'assets', '**', '*'),
                to: path.resolve(__dirname, 'dist')
            }
        ]),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
            'FRAMEWORK_URL': JSON.stringify(process.env.FRAMEWORK_URL),
            'STORYVIEWER_URL': JSON.stringify(process.env.STORYVIEWER_URL),
            'DEBUG': JSON.stringify(true)
        }),
    ],
});