const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
require('dotenv').config();

const environment = process.env.NODE_ENV || "production";
const minimize = environment === "production";

module.exports = {
    mode: environment,
    context: __dirname,
    devtool: 'source-map',
    entry: {
        index: './index.js',
        vendors: ['babel-polyfill', 'react', 'react-dom', 'ramda']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'DinDin': `${__dirname}/app`,
            'Components': `${__dirname}/app/Components`
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
                    // fallback to style-loader in development
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash()
    ],
    optimization: {
        minimize: minimize,
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