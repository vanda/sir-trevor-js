var webpack = require('webpack');
var webpackConfigMerger = require('webpack-config-merger');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var banner = [
  '/*!',
  ' * Sir Trevor JS v<%= pkg.version %>',
  ' *',
  ' * Released under the MIT license',
  ' * www.opensource.org/licenses/MIT',
  ' *',
  ' * <%= grunt.template.today("yyyy-mm-dd") %>',
  ' */\n\n',
].join("\n");

module.exports = webpackConfigMerger(require('./config'), {
  output: {
    filename: 'sir-trevor.min.js'
  },
  plugins: [
    new ExtractTextPlugin("sir-trevor.min.css"),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      },
      mangle: false,

    }),
    new webpack.BannerPlugin({banner: banner, raw: true})
  ],
  module: {
    rules: [{
      test: /\.svg$/,
      use: ExtractTextPlugin.extract({
        use: "file-loader?name=[name].debug.[ext]"
      })
    }, {
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      options: {
        presets: ['babel-preset-es2015']
      }
    }]
  }
});
