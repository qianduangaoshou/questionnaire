/**
 * Created by dell-dell on 2017/9/19.
 */

const webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    // 入口文件
    entry: {
        main: "./src/main.js",
        list: "./src/pages/list/list.js",
        edit: "./src/pages/edit/edit.js",
        fill: "./src/pages/fill/fill.js",
        data: "./src/pages/data/data.js"
        // pagetwo: "./src/pages/pagetwo/pagetwo.js",//已多次提及的唯一入口文件
    },
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "[name].js",//打包后输出文件的文件名
        publicPath:"",
        chunkFilename:'./public/[name].js'
    },
    devServer: {
        contentBase: "./src",
        historyApiFallback: true,
        inline: true,
        progress: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          filename: 'list.html',// 表示最终打包之后的文件名称
          template: './src/pages/list/list.html', // 表示要进行打包的文件
          chunks: ['list']// 表示要进行需要进行引入打包的东西
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html',
          chunks: ['main']
        }),
        new HtmlWebpackPlugin({
          filename: 'edit.html',
          template: './src/pages/edit/edit.html',
          chunks: ['edit']
        }),
        new HtmlWebpackPlugin({
          filename: 'fill.html',
          template: './src/pages/fill/fill.html',
          chunks: ['fill']
        }),
        new HtmlWebpackPlugin({
          filename: 'data.html',
          template: './src/pages/data/data.html',
          chunks: ['data']
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
};