var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './content.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'content.js'
  },
  externals: {
    "jquery": "$"
  },
  devtool: 'source-map',
  module: {
    loaders: [
          {
            test: /\.js?$/, 
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-0']
            }
          }
    ]
  }
};
