# Квиз

## Стэк 
- Json Server
- TypeScript
- Webpack
- SCSS

# Как настраивать проект c ноля
1. npm init
2. npm i typescript
3. npx tsc --init
4. npm i -D webpack webpack-cli
5. npm install node-sass --save
6. Настройка скриптов в package.json 
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --watch --mode development",
    "build": "webpack --mode production"
}
``` 
7. Настройка tsconfig
```
 "outDir": "../dist/",
    "noImplicitAny": true,
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node",
```
8. Насйтрока webpack.config.js
```
module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [new MiniCssExtractPlugin()],
};
```
9. npm run dev

## Добавление JSON Server
1. npm i json-server
2. Добавление скрипта в package.json
```
"json-server": "json-server data/db.json"
```
3. npm run json-server