path = require("path");
require('dotenv').config();

const environment = process.env.DEVELOPMENT ? "development" : "production";
const minimize = !process.env.DEVELOPMENT;

module.exports = {
    mode: environment,
    context: __dirname,
    devtool: 'source-map',
    entry: {
        index: './index.js',
        vendors: ['babel-polyfill', 'react', 'react-dom', 'ramda']
    },
    output: {
        path: path.join(__dirname, 'build')
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
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
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