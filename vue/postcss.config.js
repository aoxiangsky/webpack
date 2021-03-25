/*
 * @Author: your name
 * @Date: 2021-03-25 11:06:32
 * @LastEditTime: 2021-03-25 13:28:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\postcss.config.js
 */
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    plugins: [
        [
          "postcss-preset-env",
          {
            // Options
          },
        ],
      ],
}
