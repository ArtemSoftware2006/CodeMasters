const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
import webpack from 'webpack' 
import "webpack-dev-server";

//Задачи
// + 1. сделать конфиг TS 
// + 2. Установить DevServer
// + 3. Создать карту
// + 4. Настроить переменные окружения

enum Mode {
  development = 'development',
  production = 'production',
}

interface IEnviromentVariables  {
  mode : Mode;
}

export default (env : IEnviromentVariables) => {
const isDev = env.mode === Mode.development

console.log(isDev)

  const config : webpack.Configuration = {
    // Задает режим сборки
    mode : env.mode,
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name][contenthash].js',
      //Пересоздаёт каждый раз сборку
      clean : true
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devServer : {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 9000,
    },
    //Есть loader-ы - возможность работы webpack c файлами специфичных для webpack расширений
    //Порядок для loader важен!!!
    module : {
      rules : [
          {
              test: /\.([cm]?ts|tsx)$/, 
              loader: "ts-loader",
              exclude : /node_modules/
          }
      ]
    },
    //Дополнительные возможности при сборке
    plugins : [
      new HtmlWebpackPlugin({template  : './index.html'})
    ],
    //Для удобного дебага после сборки
    devtool : isDev ? false : "inline-source-map", 
    
  };
  return config
}
