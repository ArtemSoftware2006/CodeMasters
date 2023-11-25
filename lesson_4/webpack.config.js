"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
require("webpack-dev-server");
//Задачи
// + 1. сделать конфиг TS 
// + 2. Установить DevServer
// + 3. Создать карту
// 4. Настроить переменные окружения
var config = {
    // Задает режим сборки
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        //Пересоздаёт каждый раз сборку
        clean: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    //Есть loader-ы - возможность работы webpack c файлами специфичных для webpack расширений
    //Порядок для loader важен!!!
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                loader: "ts-loader",
                //exclude : /node_modules/
            }
        ]
    },
    //Дополнительные возможности при сборке
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' })
    ],
    //Для удобного дебага после сборки
    devtool: "inline-source-map"
};
exports.default = config;
