module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true
  },
  ecmaFeatures: {
    //指定要使用其他那些语言对象
    experimentalObjectRestSpread: true, //启用对对象的扩展
    jsx: true, //启用jsx语法
    globalReturn: true, //允许return在全局使用
    impliedStrict: true //启用严格校验模式
  },
  extends: ["eslint:recommended"],
  // eslint未支持的js新特性先进行转换
  parser: "babel-eslint",
  plugins: [],
  // extends: "eslint:recommended", // 使用官方推荐规则，使用其他规则，需要先install，再指定。
  rules: {
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
};
