var webpack = require('webpack');

var c = {
    entry: "./example/index.js",
    output: {
        path: "./example/build",
        filename: 'bundle.js'
    },
    module: {
        loaders: [ ]
    }
};

module.exports = c;
