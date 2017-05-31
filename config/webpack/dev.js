const webpack = require('webpack');
const webpackConfigMerger = require('webpack-config-merger');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = webpackConfigMerger(require('./config'), {
  devtool: 'source-map',
  output: {
    filename: 'sir-trevor.debug.js'
  },
  plugins: [
    new ExtractTextPlugin("sir-trevor.debug.css"),
    new webpack.LoaderOptionsPlugin({
       debug: true
    })
  ]
});

config.module.rules = [{
  test: /\.svg$/,
  use: ExtractTextPlugin.extract({
    use: "file-loader?name=[name].debug.[ext]"
  })
}, {
  test: /\.scss$/,
  enforce: "pre",
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
      loader: "css-loader", options: {
        sourceMap: true
      }
    }, {
      loader: "resolve-url-loader"
    }, {
      loader: "postcss-loader", options: {
        sourceMap: true
      }
    }, {
      loader: "sass-loader", options: {
        sourceMap: true,
        outputStyle: 'uncompressed'
      }
    }]
  })
}, {
  test: /\.js?$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel-loader'
}]

module.exports = config;
