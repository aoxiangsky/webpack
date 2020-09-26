# 手写一个 webpack

```webpack

// module是指不只出现自己业务代码里的错误，同时也指向第三方模块，或者loader里的错误
//eval形式不会生成map对应关系，而是独特的eval映射关系，优点是效率高，缺点是生成的对应关系不全面
// development devtool: 'cheap-module-eval-source-map',	//开发建议用这个
// production devtool: 'cheap-module-source-map', //线上建议用这个
devtool: 'cheap-module-eval-source-map',
// devtool: 'source-map', //打包文件中会出现一个map映射关系文件
//devtool: 'inline-source-map' // 映射关系文件会以dataURL的格式直接被写入main.js的底部,精确到某一行某一列，太精确性能会下降，可在前面加cheap只精确到某一行
//devtool: 'cheap-inline-source-map' //	此时source只精确到某一行，不会精确到某一列

```

--profile --json > stats.json

可以使用命令行 npm outdated，列出所以可以更新的包。免得再一个个去npm找相对于的可用版本了
