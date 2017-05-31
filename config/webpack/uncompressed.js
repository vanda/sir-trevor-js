var webpack = require('webpack');
var webpackConfigMerger = require('webpack-config-merger');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = webpackConfigMerger(require('./config'), {
  output: {
    filename: 'sir-trevor.js'
  },
  plugins: [
    // Include so we can share config, but disable
    new ExtractTextPlugin("sir-trevor.css"),
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
    use: ['css-loader', 'resolve-url-loader', 'postcss-loader', 'sass-loader?outputStyle=uncompressed']
  })
}, {
  test: /\.js?$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel-loader'
}];

module.exports = config;
