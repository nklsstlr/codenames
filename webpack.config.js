const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = function (env, argv) {
  console.log("mode : ", argv.mode);
  return {
    // webpack will take the files from ./src/index
    entry: "./src/web/index",

    // and output it into /dist as bundle.js
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "bundle.js",
      publicPath: "/",
    },

    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    devServer: {
      historyApiFallback: true,
    },

    module: {
      rules: [
        // we use babel-loader to load our jsx and tsx files
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },

        // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
        {
          test: /\.(s*)css$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/web/index.html",
      }),
      new Dotenv({
        path:
          argv.mode === "production"
            ? "./environments/.env.production"
            : "./environments/.env.development", // load this now instead of the ones in '.env'
      }),
    ],
  };
};
