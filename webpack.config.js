var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/public/js/coaster-redux/index.js'
  ],
  output: {
    path: './src/public/dist',
    filename: 'main.js'
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
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
                presets: ['es2015', 'stage-0', 'react']
            }
          }
    ]
  }
};
