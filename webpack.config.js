const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

const deps = require("./package.json").dependencies;

const printCompilationMessage = require('./compilation.config.js');

module.exports = (_, argv) => ({
  output: {
    publicPath: argv.mode === "development" 
                  ? "http://localhost:3000/" 
                  : "https://splendorous-cucurucho-317b5d.netlify.app/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, 'src')],
    onListening: function (devServer) {
      const port = devServer.server.address().port

      printCompilationMessage('compiling', port)

      devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage('failure', port)
          } else {
            printCompilationMessage('success', port)
          }
        })
      })
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        colorPicker: argv.mode === "development" 
                       ? "mf_colorpicker@http://localhost:3001/remoteEntry.js" 
                       : "mf_colorpicker@https://grand-peony-c00760.netlify.app/remoteEntry.js",
        colorList:  argv.mode === "development" 
                      ? "mf_colorlist@http://localhost:3002/remoteEntry.js" 
                      : "mf_colorlist@https://iridescent-tulumba-b424f6.netlify.app/remoteEntry.js",
        preSet:  argv.mode === "development" 
                   ? "mf_preset@http://localhost:3003/remoteEntry.js" 
                   : "mf_preset@https://meek-liger-777a0a.netlify.app/remoteEntry.js",
        mf_navbar:  argv.mode === "development" 
                   ? "mf_navbar@http://localhost:3004/remoteEntry.js" 
                   : "mf_navbar@https://glittering-crisp-6f1b26.netlify.app/remoteEntry.js",
        mf_information:  argv.mode === "development" 
                   ? "mf_information@http://localhost:3005/remoteEntry.js" 
                   : "mf_information@https://rad-liger-5a56f1.netlify.app/remoteEntry.js",
        mf_vue:  argv.mode === "development" 
                   ? "mf_vue@http://localhost:3006/remoteEntry.js" 
                   : "mf_vue@https://dancing-crostata-926ae8.netlify.app/remoteEntry.js",
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
});
