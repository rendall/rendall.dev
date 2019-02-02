const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './_src/ts/home.js',
  output: {
    filename: 'home.js',
    path: path.resolve(__dirname, 'js')
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv({safe:true})
  ]
};