const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  entry: "./_src/ts/home.js",
  output: {
    filename: "home.js",
    path: path.resolve(__dirname, "js"),
  },
  devtool: "source-map",
  plugins: [new Dotenv({ safe: true })],
};
