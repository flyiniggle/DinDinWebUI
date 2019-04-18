const path = require('path');

require('dotenv').config();
const express = require('express');
const app = express();
const webpack = require('webpack');

const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);

app.use(
    require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    })
);
app.use(require('webpack-hot-middleware')(compiler));

// Serve the static files from the React app
app.use('/static', express.static(path.join(__dirname, '..', 'build', 'static')));

// Manifest.json and icons
app.use('/manifest', express.static(path.join(__dirname, '..', 'manifest')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log(`listening on port ${port}`);//eslint-disable-line no-console
});
