const path = require('path');

const time = new Date().getTime()

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bsade.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module:{
    rules:[
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ]
        },
    ]
  },
 mode: 'production',
 optimization: {
   usedExports: true,
 },
};