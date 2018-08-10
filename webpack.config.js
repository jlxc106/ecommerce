const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/public/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    //dev
    'webpack-dev-server/client?http://localhost:8080',
    __dirname + '/src/client/app.js',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /server/],
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    //dev
    filename: 'bundle.js',
    // filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    proxy:{
      '/auth': 'http://localhost:3000'
    }
    // proxy: {
    //   '/socket.io': {
    //     target: 'http://localhost:3000',
    //     ws: true
    //     // secure: false
    //   }
    // }
  },
  devtool: 'inline-source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
//   optimization:{
//     minimize: true,
//     minimizer:[
//       new UglifyJsPlugin({
//         include: /\.min\.js$/
//       })
//     ]
//   },
//   mode: 'production',
  mode: 'development',
  plugins: [HTMLWebpackPluginConfig]
};
