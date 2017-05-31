var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    library: "SirTrevor",
    libraryTarget: "umd",
    path: './build'
  },
  externals: {
    "jquery": {
      root: "jQuery",
      commonjs: "jquery",
      commonjs2: "jquery",
      amd: "jquery"
    }
  },
  module: {
    rules: [{
      test: /\.scss$/,
      enforce: "pre",
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: "css-loader"
        }, {
          loader: "resolve-url-loader"
        }, {
          loader: "postcss-loader"
        }, {
          loader: "sass-loader", options: {
            outputStyle: 'compressed'
          }
        }]
      })
    }, {
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  }
};
