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
    ecmaFeatures: {
      //指定要使用其他那些语言对象
      experimentalObjectRestSpread: true, //启用对对象的扩展
      jsx: true, //启用jsx语法
      globalReturn: true, //允许return在全局使用
      impliedStrict: true, //启用严格校验模式
      modules: true
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
  