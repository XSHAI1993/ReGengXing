
//WebPack可以看做是模块打包机

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {     //已多次提及的唯一入口文件
  	  main:[
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/index.js'
  ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react'],
            plugins: [
              ['react-hot-loader/babel']
//            ['import', {"libraryName": "antd", "style": "css"}]
            ]
          }
        }
      },
      {
        test: /\.css$/
//      use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
 
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
//         TODO 对其他第三方依赖也要在这里进行代码分割
        return module.context && module.context.indexOf('jquery') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })

  ]
};
