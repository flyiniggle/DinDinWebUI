const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
require('dotenv').config();

const ENV = process.env.NODE_ENV || 'production';
const IN_PRODUCTION = ENV === 'production';

module.exports = {
    mode: ENV,
    context: __dirname,
    devtool: 'source-map',
    entry: {
        index: './index.js',
        vendors: ['babel-polyfill', 'react', 'react-dom', 'ramda']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: IN_PRODUCTION ? '[name].[chunkhash].js' : '[name].js'
    },
    resolve: {
        alias: {
            DinDin: `${__dirname}/app`,
            Components: `${__dirname}/app/Components`,
            Styles: `${__dirname}/app/Styles`
        }
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
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
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
            filename: 'index.html'
        }),
        new WebpackMd5Hash()
    ],
    optimization: {
        minimize: IN_PRODUCTION,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
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