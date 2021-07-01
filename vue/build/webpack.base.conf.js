/*
 * @Author: your name
 * @Date: 2021-03-25 11:06:32
 * @LastEditTime: 2021-03-26 12:19:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\build\webpack.base.conf.js
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const {
  VueLoaderPlugin
} = require('vue-loader')
const config = require("../config");

const commonConfig = {
  entry: path.resolve(__dirname, "../src/main.js"),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath,
    clean: true,
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "vue$": 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['cache-loader', 'vue-loader']
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [{
            loader: "thread-loader"
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.html/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type:'asset/resource'
      },
      // {
      //   test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      //   loader: "url-loader",
      //   options: {
      //     limit: 10000,
      //     name: "static/media/[name].[hash:8].[ext]",
      //   },
      // },
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       limit: 10240,
      //       name: "static/fonts/[name]-[hash:8].[ext]",
      //     },
      //   },
      // },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack-common",
      filename: "index.html",
      template: "public/index.html",
    }),
    new VueLoaderPlugin(),
  ],
};

module.exports = commonConfig;