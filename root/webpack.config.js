const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "root-application": "src/root-application.js",
  },
  output: {
    publicPath: "/",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules", "@blrandel", "maas-ui-legacy"),
        ],
        loader: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            ignoreCustomFragments: [/\{\$.*?\$}/, /\{\{.*?\}\}/],
            removeComments: true,
            collapseWhitespace: true,
          },
        },
      }
    ],
  },
  node: {
    fs: "empty",
  },
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: [".js"],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      inject: false,
    }),
  ],
  devtool: "source-map",
  externals: [],
  devServer: {
    historyApiFallback: true,
    writeToDisk: true,
  },
};
