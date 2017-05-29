var webpack = require('webpack');

module.exports = {
    entry: './src/app.jsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public'
    },
    watch: true,

    module: {
        loaders: [{
            test: /\.jsx?/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                    "presets": ["es2015", "react"]
                }
        }]
    }
}