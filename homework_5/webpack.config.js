// ИСПРАВЕННО!!! Вот это прям очень плохо. Если приходится таким образом прибивать TS значит делаешь что-то не то, надо разбираться
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("webpack-dev-server")

module.exports = {
  mode : 'development',
  entry: './src/app/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.scss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ],
    },
    devServer: {
      compress: true,
      port: 9000,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({template  : './index.html'})]
  };
