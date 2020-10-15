const loaderUtils = require("loader-utils"); // 有时options传过来的不是对象，是字符串，官方推荐用这个进行分析

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const callback = this.async();
  setTimeout(() => {
    const result = source.replace("dell", options.name);
    callback(null, result);
  }, 1000);

};
