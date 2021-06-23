const currentTask = process.env.npm_lifecycle_event
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const config = {
  entry: path.resolve(__dirname, './src/index.jsx'),
  output: {
    // outputs the bundled file to the dist directory
    path: path.resolve(__dirname, 'dist'),
    // set chunks' filenames to include a hash for cache-busting
    chunkFilename: '[name].[fullhash].js',
    // define publicPath to prevent plugins from appending extra directory names
    publicPath: ''
  },
  mode: 'development',
  // config for Webpack's built-in development server
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: {
      index: 'index.html'
    },
  },
  // config for plugins
  plugins: [
    // mini-css-extract-plugin for creating a separate css file
    new MiniCssExtractPlugin({
      // set filename to include a hash for cache-busting
      filename: 'style.[fullhash].css'
    }),
    // html-webpack-plugin for using src/index.html as a template for the final html file
    // this also automatically inserts links to hashed css and js files in the built index.html
    new HtmlWebpackPlugin({
      template: './src/template.html',
      // favicon: './src/assets/favicon/favicon.ico'
    }),
    new ESLintPlugin({
      context: path.resolve(__dirname, './src/'),
      extensions: ['jsx', 'js'],
    }),
    // copy the favicon files into the build directory
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets/favicon/', to: 'assets/favicon' }
      ]
    })
  ],
  // allow webpack to recognize jsx files
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // rules for each file type to be processed
  module: {
    rules: [
      // use mini-css-extract-plugin and sass-loader to process sass and create an external css file from it
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // use babel to transpile ES6 and eslint to lint it
      {
        test: /\.(js|jsx)$/,
        // exclude the node_modules directory
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      // handle asset files
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          },
        ],
        type: 'javascript/auto'
      },
    ]
  },
  // split the output into two bundles, one for dependent node modules, and one for the app itself
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // put all used node_modules modules in this chunk
          name: "vendor", // name of bundle
          chunks: "all" // type of code to put in this bundle
        }
      }
    }
  }
}

// when building, create a manifest file
if (currentTask === 'build') {
  config.mode = 'production'
  config.plugins.push(
    new WebpackPwaManifest({
      name: 'React Base Project',
      icons: [
        { src: path.resolve('./src/assets/favicon/icon-192.png'), sizes: '192x192' },
        { src: path.resolve('./src/assets/favicon/icon-512.png'), sizes: '512x512' }
      ]
    }),
  )
} else {
  // when watching, create a source map
  config.devtool = 'eval-cheap-source-map'
}

module.exports = config

// or "npm run start" to watch
// or "npm run build" to build
