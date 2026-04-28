const path = require("path")
const webpack = require("webpack")

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: [
    "@babel/polyfill",
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true",
    "./src/stylesheets/index.less",
    "./src/index"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "fasit.js",
    publicPath: `http://localhost:${process.env.PORT}/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: [/node_modules/, /styles/],
        use: ["babel-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: "url-loader",
          options: { limit: 10000, mimetype: "application/font-woff" }
        }]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ["file-loader"]
      }
    ]
  }
}
