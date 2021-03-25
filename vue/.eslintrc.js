/*
 * @Author: your name
 * @Date: 2021-03-25 11:06:32
 * @LastEditTime: 2021-03-25 13:16:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue\.eslintrc.js
 */
module.exports = {
    root: true,
    parserOptions: {
      sourceType: "module",
      // eslint未支持的js新特性先进行转换
      parser: "babel-eslint"
    },
    env: {
      browser: true,
      node: true,
      es6: true
    },
    extends: ['plugin:vue/essential',"eslint:recommended"],
    plugins: [],
    rules: {
      // allow debugger during development
      "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
      // 禁止使用 var
      'no-var': "error",
    }
  };
  