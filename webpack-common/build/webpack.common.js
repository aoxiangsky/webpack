const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// A webpack plugin to remove/clean your build folder(s)
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 编译进度条显示插件
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const merge = require("webpack-merge");
// ecognizes certain classes of webpack errors and cleans, aggregates and prioritizes them to provide a better Developer Experience
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const devConfig = require("./webpack.dev.js");
const prodConfig = require("./webpack.prod.js");

const commonConfig = {
  entry: {
    main: [path.resolve(__dirname, "../src/index.js")]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "../src/")
    },
    // 当目录下没有 package.json 文件时，我们说会默认使用目录下的 index.js 这个文件，其实这个也是可以配置的,也可以添加其他默认使用的文件名
    mainFiles: ["index"]
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        use: [
          { loader: "thread-loader" },
          { loader: "babel-loader" },
          {
            loader: "eslint-loader",
            options: {
              fix: true,
              // eslint友好提示
              formatter: require("eslint-friendly-formatter"),
              emitWarning: true
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10240,
            outputPath: "font/",
            name: "[name]-[contenthash:6].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    // 友好提示
    new FriendlyErrorsWebpackPlugin(),
    // 打包前清空dist文件夹目录下文件
    new CleanWebpackPlugin(),
    // 设置根模板文件
    new HtmlWebpackPlugin({
      title: "webpack-common",
      filename: "index.html",
      template: "public/index.html"
    })
  ],
  output: {
    path: path.resolve(__dirname, "../dist")
  }
};

module.exports = () => {
  if (process.env.NODE_ENV === "production") {
    return merge(commonConfig, prodConfig);
  } else {
    return merge(commonConfig, devConfig);
  }
};
