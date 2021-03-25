/*
 * @Author: your name
 * @Date: 2021-03-25 11:06:32
 * @LastEditTime: 2021-03-25 13:12:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue\config\dev.env.js
 */
'use strict'
const { merge } = require('webpack-merge');
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://10.250.115.99/statistics"' //代理路径
})
