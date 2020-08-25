const path = require("path");
module.exports = {
  // Specifies the ESLint parser
  // 指定ESLint解析器
  parser: "@typescript-eslint/parser",
  extends: [
    // Uses the recommended rules from @eslint-plugin-react
    // 使用来自 @eslint-plugin-react 的推荐规则
    "plugin:react/recommended",
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    // 使用来自@typescript-eslint/eslint-plugin的推荐规则
    "plugin:@typescript-eslint/recommended",
    // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    // 使用 ESLint -config-prettier 禁用来自@typescript-eslint/ ESLint 与 prettier 冲突的 ESLint 规则 
    "prettier/@typescript-eslint",
    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "@typescript-eslint/eslint-plugin"
  ],
  parserOptions: {
    project: path.resolve(__dirname, "./tsconfig.json"),
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX,允许对JSX进行解析
    },
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports, 允许使用 import
  },
  "settings": {
    // Tells eslint-plugin-react to automatically detect the version of React to use
    // 告诉 eslint-plugin-react 自动检测 React 的版本
    "react": {
      "version": "detect"
    }
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};