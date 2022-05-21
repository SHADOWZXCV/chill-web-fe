const path = require("path");
const htmlWPP = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "prod"),
    filename: "index_bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|module.css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader",
        {
          loader: 'sass-loader',
          options: {
            additionalData: '@import "./style/_main.scss";',
          }
        }
      ],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|webp)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader",
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new htmlWPP({
      template: path.resolve(__dirname, "views/index.html"),
    }),
  ],
  devtool: "eval-source-map",
};
