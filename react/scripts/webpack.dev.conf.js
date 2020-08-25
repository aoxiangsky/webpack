'use strict';
const utils = require('./utils');
const config = require('../config');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// const StylelintPlugin = require('stylelint-webpack-plugin');
const commonConfig = require('./webpack.base.conf.js');
const env = require('../config/dev.env');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        open: config.dev.autoOpenBrowser,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        hot: true,
        contentBase: '../dist',
        quiet: true, // necessary for FriendlyErrorsPlugin
        disableHostCheck: false,
        https: false,
        compress: false,
        historyApiFallback: {
            rewrites: [
                {
                    from: /.*/,
                    to: path.posix.join(config.dev.assetsPublicPath, 'index.html'),
                },
            ],
        },
        overlay: config.dev.errorOverlay
            ? {
                  warnings: false,
                  errors: true,
              }
            : false,
        proxy: config.dev.proxyTable,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                            sourceMap: true,
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                enforce: 'pre',
                test: /\.(j,t)s[x]?$/,
                include: path.resolve(__dirname, '../src'),
                loader: 'eslint-loader',
                options: {
                    fix: true,
                    cache: true,
                    emitWarning: true,
                    formatter: require('eslint-friendly-formatter'),
                },
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': env,
        }),
    ],
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            const localIp = utils.getIpAddress() || 'localhost';
            process.env.PORT = port;
            devConfig.devServer.port = port;
            devConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [
                            `哈哈，又是开心Coding的一天呀！应用运行于: \n\n - Local:  http://localhost:${port} \n\n - Network: http://${localIp}:${port}\n\n`,
                        ],
                    },
                    onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined,
                }),
            );
            resolve(devConfig);
        }
    });
});
