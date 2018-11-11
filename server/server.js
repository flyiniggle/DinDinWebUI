const path = require('path');

require('dotenv').config();
const express = require('express');
const app = express();

// Serve the static files from the React app
app.use('/static', express.static(path.join(__dirname, '..', 'build', 'static')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log(`listening on port ${port}`);//eslint-disable-line no-console
});
