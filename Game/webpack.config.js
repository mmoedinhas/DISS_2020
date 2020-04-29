const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const distPath = 'dist';

module.exports = {
    entry: {
        app: './src/game/main.ts',
        vendors: ['phaser']
    },

    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },

    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, distPath)
    },

    mode: 'development',

    devServer: {
        contentBase: path.resolve(__dirname, distPath),
        writeToDisk: true
    },

    plugins: [
        new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '*.html'),
                to: path.resolve(__dirname, distPath)
            },
            {
                from: path.resolve(__dirname, 'assets', '**', '*'),
                to: path.resolve(__dirname, distPath)
            },
            {
                from: path.resolve(__dirname, 'sigma', "**", "*"),
                to: path.resolve(__dirname, distPath)
            }
        ]),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true)
        }),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};