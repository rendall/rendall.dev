const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: "production",
  entry: {
    "./blog/js/post": "./_src/ts/post.ts",
    "./js/home": "./_src/ts/home.ts",
    "./js/post": "./_src/ts/post.ts",
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
    new CopyWebpackPlugin({
      patterns: [{ from: "./static" }],
    }),
  ],
  devtool: "source-map",
}
