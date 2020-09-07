const path = require("path");
// This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// It will search for CSS assets during the Webpack build and will optimize \ minimize the CSS
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// This plugin uses terser to minify your JavaScript.
const TerserPlugin = require("terser-webpack-plugin");
// Prepare compressed versions of assets to serve them with Content-Encoding
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// A Webpack plugin that uses the node-notifier module to display OS-level notifications for Webpack build errors and warnings.
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
// This is a webpack plugin that inline your manifest.js with a script tag to save http request
const InlineManifestWebpackPlugin = require("inline-manifest-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

const prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:6].[ext]",
              outputPath: "images/",
              limit: 10240
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true
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
  performance:false,
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }]
        },
        canPrint: true
      }),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        parallel: true,
        cache: true,
        sourceMap: true,
        terserOptions: {
          // 清除生产环境的控制台输出
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    ],
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      // all 对所有同步代码和异步代码进行代码分割打包
      // async 对异步代码(按需加载的)进行代码分割，默认为异步
      // innitial  对所有同步的库和异步的库(初始加载的 )进行代码分割
      chunks: "initial",
      // 引入的包代码或者库大于30KB才做代码分割
      minSize: 30000,
      // 如果大于最大值，将尝试二次拆分,0表示无限大
      maxSize: 0,
      // 引入次数大于等于该数才进行代码分割
      minChunks: 1,
      // 同时加载的模块数最多为
      maxAsyncRequests: 6,
      // 入口文件进行加载时，最多分割js文件数
      maxInitialRequests: 4,
      // 组和文件名之间的连接符
      automaticNameDelimiter: "~",
      automaticNameMaxLength: 30,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先次序，数值越大优先级越高
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          // 如果一个模块已经被打包过了，就跳过打包，直接使用之前打包好的
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new WebpackBuildNotifierPlugin({
      title: "亲，项目打包完毕哦~",
      suppressSuccess: true
    }),
    new HtmlWebpackPlugin({
      title: "webpack-common",
      filename: "index.html",
      template: "public/index.html",
      minify: {
        // 合并空格
        collapseWhitespace: true,
        // 移除注解
        removeComments: true,
        // 移除多余的属性
        removeRedundantAttributes: true,
        // 移除脚本类型属性
        removeScriptTypeAttributes: true,
        // 移除样式类型属性
        removeStyleLinkTypeAttributes: true,
        // 使用简短的文档类型
        useShortDoctype: true,
        removeEmptyAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs:true
      }
    }),
    new InlineManifestWebpackPlugin("runtime"),
    new CompressionPlugin(),
    new MiniCssExtractPlugin({
      filename: "style/[name].[contenthash:9].css",
      chunkFilename: "style/[name].[contenthash:9].chunk.css"
    })
  ],
  output: {
    filename: "[name]~[contenthash:9].js",
    chunkFilename: "[name]~chunk~[contenthash:9].js"
  }
};

module.exports = prodConfig;
