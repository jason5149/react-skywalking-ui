const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptmizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnaylyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    ['index']: ['./index.js'],
  },
  output: {
    path: path.resolve('./dist/'),
    library: '[name].js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        cache:         true,
			  parallel:      true,
			  terserOptions: {
				  ecma:   6,
				  mangle: true,
				  output: {
					  comments: false,
				  },
			  },
			  sourceMap: true,
      }),
      new OptmizeCssAssetsPlugin({})
    ],
  },
  performance: {
    hints: false,
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  plugins: [
    new WebpackBar({
      name: '🚚  Ant Design Tools',
      color: '#2f54eb',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
}