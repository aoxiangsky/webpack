'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: 'testing',
  BASE_API: 'http://10.250.115.99/statistics' //代理路径
})
