const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
dotenv.config();

module.exports = merge(common, {

    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../Story Viewer/public/dist')
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'assets', '**', '*'),
            to: path.resolve(__dirname, '../Story Viewer/public/dist')
        }]),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
            'SERVICE_URL': JSON.stringify('..')
        }),
    ],
});