const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

// Determine if development or not
const dev = process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1

// HTML plugin
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body'
})

// Plugin config
const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
})

// UglifyJS
const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true
  },
  compress: {
    screw_ie8: true
  },
  comments: false
})

// Webpack config
module.exports = {
  // Development server
  devServer: {
    host: 'localhost',
    port: '8000',
    quiet: true, // Remove console spam
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*' // Allow CORS
    }
  },
  // Entry point
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, '/src/index.jsx')
  ],
  // Dummies for native Node modules not present in browser scope
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    crypto: 'empty'
  },
  // Loaders
  module: {
    loaders: [
      { // JSX
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      { // SCSS
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      { // Images
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  // Extension config
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // Production build
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/build')
  },
  plugins:
    dev ? [ // Development - use hot reload and named modules
      HTMLWebpackPluginConfig,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ] : [ // Production - generate public build
      HTMLWebpackPluginConfig,
      DefinePluginConfig,
      UglifyJsPluginConfig
    ]
}
