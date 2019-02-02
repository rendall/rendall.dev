const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './js/users.js',
  output: {
    filename: 'users.js',
    path: path.resolve(__dirname, 'js')
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv({safe:true})
  ]
};