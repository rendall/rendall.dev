const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  mode: "production",
  entry: {
    "./blog/js/post": "./_src/ts/post.ts",
    "./js/home": "./_src/ts/home.ts",
    "./js/post": "./_src/ts/post.ts",
    "./js/resume": "./_src/ts/resume.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "./static" }],
    }),
  ],
  devtool: "source-map",
}
