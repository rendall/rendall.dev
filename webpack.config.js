const path = require("path");

module.exports = {
  mode: "production",
  entry: "./_src/ts/home.js",
  output: {
    filename: "home.js",
    path: path.resolve(__dirname, "js"),
  },
  devtool: "source-map",
};
