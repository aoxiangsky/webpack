const path = require("path");
const webpack = require("webpack");
// is a plugin for webpack to provide an intermediate caching step for modules.
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    open: true,
    port: 5168,
    hot: true,
    quiet: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://api.xxxx.com.cn",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/"
          }
        }
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "async"
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin()
  ],
  output: {
    filename: "[name].js",
    chunkFilename: "[name].[contenthash].chunk.js"
  }
};

module.exports = devConfig;
