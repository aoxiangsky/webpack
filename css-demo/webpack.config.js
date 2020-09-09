const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProductionMode = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProductionMode ? "production" : "development",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:9].css",
      chunkFilename: "[name].[contenthash:9].chunk.css",
    }),
    new OptimizeCssAssetsPlugin({}),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:9].js",
  },
};
