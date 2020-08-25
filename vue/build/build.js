process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('啊啊啊啊啊，我要生了ψ(*｀ー´)ψ')
spinner.start()

rm(path.join(config.build.assetsRoot), err => {
  if (err) throw err

  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  打包完毕。\n'))
    console.log(chalk.yellow(
      '  注意：构建的文件应该在HTTP服务器上提供服务。\n' +
      '  若在file协议下打开 index.html 将无效。\n'
    ))
  })
})
