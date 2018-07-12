const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: path.join(__dirname, '..'),
    devtool: 'source-map',
    resolve: {
        alias: {
            DinDin: `${__dirname}/../app`,
            Components: `${__dirname}/../app/Components`,
            Styles: `${__dirname}/../app/Styles`
        }
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
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
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html',
            filename: 'index.html'
        })
    ]
};