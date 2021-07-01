"use strict";
const path = require("path");
const webpack = require("webpack");
const {
  merge
} = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const SizePlugin = require("size-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const PreloadPlugin = require("@vue/preload-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const commonConfig = require("./webpack.base.conf.js");
const config = require("../config");
const env = require("../config/prod.env");

const prodConfig = {
  mode: "production",
  devtool: "eval",
  // devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   use: [
      //     // {
      //     //   loader: "url-loader",
      //     //   options: {
      //     //     name: "[name]-[hash:8].[ext]",
      //     //     outputPath: "static/img/",
      //     //     limit: 10240,
      //     //   },
      //     // },
      //     // {
      //     //   loader: "image-webpack-loader",
      //     //   options: {
      //     //     mozjpeg: {
      //     //       progressive: true,
      //     //       quality: 65,
      //     //     },
      //     //     optipng: {
      //     //       enabled: false,
      //     //     },
      //     //     pngquant: {
      //     //       quality: [0.65, 0.9],
      //     //       speed: 4,
      //     //     },
      //     //     gifsicle: {
      //     //       interlaced: false,
      //     //     },
      //     //     webp: {
      //     //       quality: 75,
      //     //     },
      //     //   },
      //     // },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(sc|sa)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true,
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
  performance: {
    hints: "warning",
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
  },
  optimization: {
    moduleIds: 'deterministic',
    // runtimeChunk: 'single',
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /node_modules/,
        parallel: true,
        // cache: true,
        // sourceMap: true,
        // terserOptions: {
        //   compress: {
        //     warnings: false,
        //     drop_console: true,
        //     drop_debugger: true,
        //   },
        // },
      }),
    ],
    runtimeChunk: {
      name: "runtime",
    },
    // splitChunks: {
    //   chunks: 'async',
    //   minSize: 20000,
    //   minRemainingSize: 0,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 30,
    //   maxInitialRequests: 30,
    //   enforceSizeThreshold: 50000,
    //   cacheGroups: {
    //     defaultVendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       reuseExistingChunk: true,
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true,
    //     },
    //   },
    // }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": env,
    }),
    new SizePlugin(),
    new WebpackBuildNotifierPlugin({
      title: "嗨，项目打包完毕啦~",
      suppressSuccess: true,
    }),
    new HtmlWebpackPlugin({
      title: "webpack-common",
      filename: "index.html",
      template: "public/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
      },
    }),
    new PreloadWebpackPlugin({
      rel: "preload",
      as: "script",
    }),
    // new PreloadPlugin(),
    // new PreloadPlugin([{
    //   rel: 'preload',
    //   include: 'initial',
    //   fileBlacklist: [/\.map$/]
    // }]),
    // new ScriptExtHtmlWebpackPlugin({
    //   inline: /^runtime\~.*\.js$/,
    // }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "../static"),
    //       to: config.build.assetsSubDirectory,
    //     },
    //   ],
    // }),
  ],
  output: {
    path: config.build.assetsRoot,
    filename: "static/js/[name]~[contenthash:8].js",
    chunkFilename: "static/js/[name]~[contenthash:8]~chunk.js",
  },
};

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");
  prodConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: "[path][base].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8,
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  prodConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(commonConfig, prodConfig);
// module.exports = smp.wrap(merge(commonConfig, prodConfig));
