let path = require('path');

module.exports = {
  mode: 'development',
  entry: '/src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js/'
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
     {
       test: /\.(cow)$/i,
    //    test: /\.(png|svg|jpg|jpeg|gif)$/i,
       type: 'asset/resource',
       generator: {
        filename: 'cowsay/[hash][ext][query]'
      }
     },
    ],
  },

  plugins: [],

  target: 'node'
};
