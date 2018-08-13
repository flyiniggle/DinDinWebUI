const path = require('path');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
require('dotenv').config();

const ENV = process.env.NODE_ENV || 'production';
const IN_PRODUCTION = ENV === 'production';
const APIRoot = process.env.API_ROOT;

module.exports = {
    mode: ENV,
    context: __dirname,
    devtool: 'source-map',
    entry: {
        index: './index.js',
        vendors: ['babel-polyfill', 'react', 'react-dom', 'ramda']
    },
    output: {
        path: path.join(__dirname, 'build', 'static'),
        filename: IN_PRODUCTION ? '[name].[chunkhash].js' : '[name].js'
    },
    resolve: {
        alias: {
            Business: `${__dirname}/app/Business`,
            DinDin: `${__dirname}/app`,
            Components: `${__dirname}/app/Components`,
            UI: `${__dirname}/app/UI`,
            Styles: `${__dirname}/app/Styles`
        }
    },
    devServer: {
        historyApiFallback: true,
        compress: true,
        overlay: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({
                                browsers: ['> 1%', 'last 2 versions']
                            })]
                        }
                    },
                    'sass-loader?sourceMap'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]

            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: IN_PRODUCTION ? 'style.[contenthash].css' : 'style.css'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html',
            filename: '../index.html'
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            __APIRoot__: JSON.stringify(`${APIRoot}`)
        })
    ],
    optimization: {
        minimize: IN_PRODUCTION,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                uglifyOptions: {
                    passes: 3
                },
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    }
};