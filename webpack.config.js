const path = require("path");
const miniCssExtraPlugin = require("mini-css-extract-plugin");
 const HtmlWebpackPlugin = require('html-webpack-plugin')

// import path from "path";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import { fileURLToPath } from "url";

// let __filename = fileURLToPath(import.meta.url);

// let __dirname = path.dirname(__filename);

module.exports = {
 
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index.bundle.js",
      },
      devServer: {
        port: 3010,
        liveReload: true,
        historyApiFallback: true,
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.css$/,
            use: [
                miniCssExtraPlugin.loader,
                "css-loader",
                "postcss-loader",
            ],
        },
          {
            test: /\.svg$/,
            use: [
              {
                loader: 'svg-url-loader',
                options: {
                  limit: 10000,
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new miniCssExtraPlugin(),
         new HtmlWebpackPlugin({template: './src/index.html'})
      ],
      
}