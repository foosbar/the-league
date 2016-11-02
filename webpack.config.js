const webpack = require('webpack');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [ 'bootstrap-loader', './app/league.js'],
    output: {
        path: './public',
        filename: 'js/league.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.pug$/,
            exclude: /node_modules/,
            loader: 'pug-loader'
        },{
            test: /\.css$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },{
            test: /\.less$/,
            loader: "style!css!less"
        },{
            test: /\.scss$/,
            loaders: ['style', 'css', 'postcss', 'sass']
        },{
            test: /\.(woff2?|ttf|eot|svg)$/,
            loader: 'url?limit=10000'
        },{
            test: /bootstrap\/dist\/js\/umd\//,
            loader: 'imports?jQuery=jquery'
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new ExtractTextPlugin('css/style.css')
        /**
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        */
        /**
        new CopyWebpackPlugin([{
            from: './app/assets/index.html',
            to: '../index.html'
        }])
        */
    ]
};