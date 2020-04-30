const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => ({
  entry: path.resolve(__dirname, "src/root-application"),
  output: {
    filename: "root-application.js",
    libraryTarget: "system",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        parser: {
          system: false,
        },
      },
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    writeToDisk: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    disableHostCheck: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist"],
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../legacy/dist/assets/images"),
        to: path.resolve(__dirname, "dist/images"),
      },
      {
        from: path.resolve(__dirname, "../legacy/dist/assets/fonts"),
        to: path.resolve(__dirname, "dist/fonts"),
      },
    ]),
    new HtmlWebpackPlugin({
      inject: false,
      template: "src/index.ejs",
      templateParameters: {
        isLocal: env && env.isLocal === "true",
      },
    }),
  ],
  externals: ["single-spa"],
});
