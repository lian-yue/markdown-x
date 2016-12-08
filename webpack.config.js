var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    "test": './src/test.js',
    'node': './src/node.js',
  },

  output: {
    path: './dist',
    publicPath: '/dist/',
    filename: "[name].js",
  },


  resolve: {
    root: path.join(__dirname, 'node_modules'),
    alias: {
    },
    extensions: ['', '.js'],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
    ]
  },

  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__ENV__': JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
}
