const path = require("path");

const config = {
  context: path.join(__dirname, "src"),
  entry: ["./index.js"],
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: path.join(__dirname, "src")
      },
      {
        test: /\.worker\.js$/,
        loader: "worker-loader",
        include: path.join(__dirname, "src")
      }
    ]
  }
};
module.exports = config;
