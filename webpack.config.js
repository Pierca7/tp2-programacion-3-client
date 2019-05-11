'use strict';
var webpack = require('webpack');

var config = {
  context: __dirname + '/src/bin',
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: "/",
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(de|en)$/),
  ],
  module: {
    rules: [{
        test: /node_modules[\\\/]vis[\\\/].*\.js$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: [ "babel-preset-es2015" ].map(require.resolve),
          plugins: [
            "transform-es3-property-literals",
            "transform-es3-member-expression-literals",
            "transform-runtime"
          ]
        }
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [ "babel-preset-es2015" ].map(require.resolve)
        }
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /.*\.png$/i,
        loaders: [ 'file-loader', {
          loader: 'image-webpack-loader',
          query: {
            progressive: true,
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
        }
      ]
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/src',
  },
  devtool: "eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  config.devtool = "source-map";
}

module.exports = config;
