var webpack = require('webpack');
var webpackConfigMerger = require('webpack-config-merger');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = webpackConfigMerger(require('./config'), {
  output: {
    filename: 'sir-trevor.test.js'
  },
  plugins: [
    new ExtractTextPlugin("sir-trevor.test.css"),
    new webpack.LoaderOptionsPlugin({
       debug: true
    })
  ],
  module: {
    rules: [{
      test: /\.svg$/,
      use: ExtractTextPlugin.extract({
        use: "file-loader?name=[name].debug.[ext]"
      })
    }]
  }
});
