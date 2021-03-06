"use strict";

const path = require("path");

module.exports = {
  commonOptions: {
    useTypescript: false,
    isMultiplePage:false,
    isMobile:false,
    htmlFontSize: '75px',
  },
  dev: {
    autoOpenBrowser: false,
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    errorOverlay: true,
    host: "0.0.0.0",
    port: 5168,
    proxyTable: {
      "/api": {
        target: "http://api.xxxx.com.cn",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  build: {
    // 设定打包地址
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "./",
    // 是否生成打包分析报告
    bundleAnalyzerReport:false,
    // 生产环境下是否开启打包压缩
    productionGzip:true,
    // 若开启压缩，压缩处理哪些文件
    productionGzipExtensions: ['js', 'css'],
  },
};
