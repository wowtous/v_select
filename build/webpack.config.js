var webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_ENV || '0');

var c = {
    entry: "./src/v_select.js",
    output: {
        path: "./example/dist",
        filename: PROD ? 'v_select.min.js' : 'v_select.js',
        library: 'v_select'
    },
    module: {
        loaders: [ ]
    },
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ] : []
};

if(PROD){
    c.devtool = "source-map"
}

module.exports = c;
