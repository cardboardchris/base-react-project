const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: "development",
  entry:  path.resolve(__dirname, './src/index.jsx'),
  // This object contains the configuration for Webpack
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'sass-loader'],
      },
      {
        // string regex that matches all javascript files in the project directory
        test: /\.(js|jsx)$/,
        // exclude the node_modules directory
        exclude: /(node_modules)/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  // plugins: [new MiniCssExtractPlugin()],
  output: {
    // outputs the bundled file to the dist directory
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    // hot: true,
    historyApiFallback: {
      index: 'index.html'
    },
  }
}

// "npm webpack" to run
// or "npm run start" to watch
