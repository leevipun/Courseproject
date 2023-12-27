const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = (env, argv) => {
  console.log("argv", argv.mode);
  const backend_url =
    argv.mode === "production"
      ? "https://courseproject-backend-6lyy.onrender.com"
      : "http://localhost:3003";

  return {
    entry: "./src/main.jsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
    },
    devServer: {
      static: path.resolve(__dirname, "dist"),
      compress: true,
      port: 3000,
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      }),
      new HtmlWebpackPlugin({
        title: "E-comrance",
        filename: "index.html",
      }),
    ],
  };
};

module.exports = config;
