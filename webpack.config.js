'use strict';

const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + '/src',
    entry: './app/app',
    output: {
        path: __dirname + '/bundle',
        publicPath: '/',
        filename: 'app.js'
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.styl', '.css'],
        modulesDirectories: ['node_modules', '.']
    },

    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

    module: {


        noParse: [
            /\.min\.js/,
        ],

        loaders: [
            {
                test: /\.js$/,
                exlude: /node_modules/,
                loaders: [
                    'babel?' + JSON.stringify({
                        presets: ['es2015', 'stage-0', 'react']
                    })
                ]
            }, {
                test: /\.styl$/,
                exlude: /node_modules/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader')
            }
        ]

    },

    postcss: function () {
        return [autoprefixer({ browsers: ["last 2 version", 'Safari 8'] })]
    },

    plugins: [
        new ExtractTextPlugin('app.css'),

        new webpack.NoErrorsPlugin(),

        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }),
    ],

    devServer: {
        host: 'localhost',
        port: 3000
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true,
            }
        })
    )
}
