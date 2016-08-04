var path = require('path');
var webpack = require('webpack');
const PROD = JSON.parse(process.env.PROD_DEV || '0');

module.exports = {
  //devtool: 'eval',
  entry: {
    "src/public/dist/main" : "./src/public/js/coaster-redux/index.js",
    "dist/content": "./chrome-extension/content.js"
  },
  output: {
    path: '',
    filename: '[name].js'
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "jquery": "$"
  },
  //devtool: 'source-map',
  module: {
    loaders: [
          { test: /\.json$/, loader: 'json' },
          { test: /\.css$/, loader: "style-loader!css-loader" },
          {
            test: /\.js?$/, 
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
          }
    ]
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    })
  ] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    })
  ]
};
