const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
    "./_src/ts/slugify": "./_src/ts/slugify.ts",
    "./dist/blog/js/post": "./_src/ts/post.ts",
    "./dist/js/home": "./_src/ts/home.ts",
    "./dist/js/post": "./_src/ts/post.ts",
    "./dist/js/resume": "./_src/ts/resume.ts",
  },
  output: {
    path: path.resolve(__dirname, "/"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './static' },
      ],
    }),
  ],
  devtool: "source-map",
};
