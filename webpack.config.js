var path = require('path')
var webpack = require('webpack')


var options = {
  entry: {},
  output: {
    path: './dist',
    publicPath: '/dist/',
    filename: "[name].js",
    libraryTarget: 'umd',
    library: 'MarkdownX[name]',
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
  options.devtool = '#source-map'
}



var tokenOption = Object.assign({}, options)
tokenOption.entry = {
  token:'./src/token',
}
tokenOption.output.library = 'MarkdownX'

var nodeOption = Object.assign({}, options)
nodeOption.entry = {
  node:'./src/node'
}
nodeOption.output.library = 'MarkdownXNode'

var testOption = Object.assign({}, options)
testOption.entry = {
  test:'./src/test'
}
testOption.output.library = 'MarkdownXTest'

module.exports = [
  tokenOption,
  nodeOption,
  testOption,
]
