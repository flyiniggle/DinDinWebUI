require('dotenv').config();

const environment = process.env.DEVELOPMENT ? "development" : "production";

module.exports = {
    mode: environment,
    context: __dirname,
    devtool: 'source-map',
    entry: './index.js',
    output: {
        path: __dirname,
        filename: './bundle.js'
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
    }
};