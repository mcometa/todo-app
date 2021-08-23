const path = require('path')

/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const MiniCssExtractPluginLoader = {
  loader: MiniCssExtractPlugin.loader,
}

const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: '[name].css',
})

const OptimizationConfig = {
  minimize: true,
  minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
}

module.exports = {
  mode: 'production',

  // Notes on which devtool mode to use:
  // https://webpack.js.org/configuration/devtool/
  devtool: 'cheap-source-map',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    filename: 'main.bundle.js',
    path: path.resolve('dist'),
    publicPath: './assets/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(gif|png|ico|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'img-loader',
            options: {
              name: '[name]_[hash:5].[ext]',
            },
          },
        ],
      },
      {
        // Refer: https://github.com/css-modules/css-modules/pull/65
        // Refer: .eslintrc.js file ("import/no-unresolved" rule)
        test: /\.(scss|css)$/,
        oneOf: [
          {
            // Loads CSS without any special processing. Reserved
            // for third-party CSS (i.e. from node_modules)
            resourceQuery: /^\?raw$/,
            use: [
              MiniCssExtractPluginLoader,
              {
                loader: require.resolve('css-loader'),
              },
            ],
          },
          {
            // Loads each CSS as module with unique localIdentName,
            // which prevents CSS pollution between app components.
            use: [
              {
                ...MiniCssExtractPluginLoader,
                options: {
                  publicPath: './',
                },
              },
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                  modules: {
                    localIdentName: '[name]__[local]__[hash:base64:5]',
                  },
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: () => [autoprefixer()],
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    MiniCssExtractPluginConfig,
  ],
  optimization: OptimizationConfig,
}
