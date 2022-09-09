const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {

    mode: 'development',

    entry: './frontend/app.js', //entry is for telling where the main file is 
    output: {// output is for tell where to find the public folder to convert the code from  javascript
        path: path.join(__dirname, 'backend/public'),
        filename: 'js/bundle.js'
    },
    mode: 'development',

    module: {
        //If we are un development mode the files should come from style-loader, otherwise in production mode charge them from MinicssExtractplugin
            rules: [
                {
                    test: /\.css/,
                    use: [
                        devMode ? 'style-loader': MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                }
            ]
        },

    plugins:[
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            minify:{
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkAttributes: true,
            useShortDoctype: true
            }            

        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        })
    ],
    devtool: 'source-map'

};