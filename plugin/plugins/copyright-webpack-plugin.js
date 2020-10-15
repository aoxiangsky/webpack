class CopyrightWebpackPlugin {
  constructor(options) {
    console.log(options);
    console.log("我要变身了");
  }
  apply(compiler) {
    // 同步的方式
    console.log(compiler.hook);
    compiler.hooks.compile.tap("CopyrightWebpackPlugin", (compilation) => {
      console.log("compiler");
    });
    // 异步的方式
    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlugin",
      (compilation, cb) => {
        console.log(compilation.assets);
        compilation.assets["copyright.txt"] = {
          source: function () {
            return "copyright by dell lee";
          },
          size: function () {
            return 21;
          },
        };
        cb();
      }
    );
  }
}

module.exports = CopyrightWebpackPlugin;
