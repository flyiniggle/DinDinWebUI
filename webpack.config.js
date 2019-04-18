const path = require('path');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const WebpackPwaManifest = require('webpack-pwa-manifest');
require('dotenv').config();

const ENV = process.env.NODE_ENV || 'production';
const IN_PRODUCTION = ENV === 'production';
const APIRoot = process.env.API_ROOT;

module.exports = {
    mode: ENV,
    context: __dirname,
    devtool: 'source-map',
    entry: {
        index: ['./index.js', !IN_PRODUCTION ? false : 'webpack-hot-middleware/client'].filter(Boolean),
        vendors: ['babel-polyfill', 'react', 'react-dom', 'ramda']
    },
    output: {
        path: path.join(__dirname, 'build', 'static'),
        filename: IN_PRODUCTION ? '[name].[hash].js' : '[name].js',
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            Business: `${__dirname}/app/Business`,
            Data: `${__dirname}/app/Data`,
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
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
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
                test: /\.(svg|png|jpg|gif|eot|ttf|woff|woff2)$/,
                use: [
                    'file-loader'
                ]

            }
        ]
    },
    plugins: [
        !IN_PRODUCTION ? false : new webpack.HotModuleReplacementPlugin(),
        IN_PRODUCTION ? false : new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html',
            filename: '../index.html'
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            __APIRoot__: JSON.stringify(`${APIRoot}`)
        }),
        new WebpackPwaManifest({
            name: 'Din Din',
            short_name: 'Din Din',
            description: 'Meal tracking and yumminess.',
            theme_color: '#ff9e01',
            background_color: '#655643',
            display: 'fullscreen',
            scope: '/',
            start_url: '/',
            ios: true,
            inject: true,
            icons: [{
                src: path.join(__dirname, 'manifest', '72.png'),
                sizes: '72x72',
                type: 'image/png'
            }, {
                src: path.join(__dirname, 'manifest', '96.png'),
                sizes: '96x96',
                type: 'image/png',
                ios: true
            }, {
                src: path.join(__dirname, 'manifest', 'apple-120.png'),
                sizes: '120x120',
                type: 'image/png',
                ios: true
            }, {
                src: path.join(__dirname, 'manifest', '128.png'),
                sizes: '128x128',
                type: 'image/png',
                ios: true
            }, {
                src: path.join(__dirname, 'manifest', '144.png'),
                sizes: '144x144',
                type: 'image/png',
                ios: true
            }, {
                src: path.join(__dirname, 'manifest', 'apple-180.png'),
                sizes: '180x180',
                type: 'image/png',
                ios: true
            }, {
                src: path.join(__dirname, 'manifest', '192.png'),
                sizes: '192x192',
                type: 'image/png',
                ios: true
            }, {
                src: path.join(__dirname, 'manifest', '512.png'),
                sizes: '512x512',
                type: 'image/png',
                ios: true
            }
            ]
        })
    ].filter(Boolean),
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