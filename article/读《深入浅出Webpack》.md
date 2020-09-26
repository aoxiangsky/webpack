# 读《深入浅出 Webpack》

## 序

我们推荐直接安装 webpack 到项目，原因是防止不同项目的因依赖不同版本的 webpack 而导致冲突。

Loader 可以看做具有文件转换功能的翻译员

在配置 Loader 时需要注意：

use 属性的值需要是一个有 Loader 名称组成的数组，Loader 的执行顺序是由后到前的
每个 Loader 都可以通过 URL querystring 的方式传入参数，例如 css-loader?minisize 中的 minisize 告诉 css-loader 要开启 css 压缩

像 Loader 传入属性的方式除了可以通过 querystring 实现，还可以通过 Object 实现，以上 Loader 配置可以修改为如下内容

```js

use: [

 'style-loader ',
    {loader :' css-loader ',
        options: {
           minimize:true,
        }

```

Plugin是用来扩展Webpack功能的，通过在构建流程里注入钩子实现，它为Weboack带来了很大的灵活性

Webpack几个核心概念

Entry: 入口，Webpack执行构建的第一步将从Entry开始，可抽象成输入
Module: 模块，在Webpack里一切皆模块，一个模块对应一个文件。Webpack会从配置的Entry开始递归找出所有依赖的模块
Chunk: 代码块，一个Chunk由多个模块组合而成，用于代码合并与压缩
Loader: 模块转换器，用于将模块的原内容按照需求转换成新内容
Plugin: 扩展插件，在Webpack构建流程中的特定时机注入扩展逻辑，来改变构建结果或我们想做的事情
Output: 输出结果，在Webpack经过一系列处理并得出最终想要的代码后输出结果

## 配置

chunk内置变量

id:chunk的唯一标识，从0开始
name: chunk的名称
hash: chunk的唯一标识的Hash值
chunkhash: chunk内容的Hash值
其中，hash和chunkhash长度是可指定的，[hash:8]代表取0位Hash值，默认为20位

output.chunkFilename配置无入口的Chunk在输出时的文件名

babel-loader?cacheDirectory  用于缓存babel编译结果，加快重新编译的速度

loader可以配置参数 enforce, enforce:'post'的含义是将该Loader的执行顺序放到最后。enforce的值还可以是pre,代表将Loader的执行顺序放到最前面
