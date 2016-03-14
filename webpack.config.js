module.exports = {
  entry: [
    './index.html',
    './src/client/images',
    './src/client/views/chess'
  ],
  output: {
    path: 'bundle',
    publicPath: './bundle/',
    filename: 'chess.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        // es6/7 JavaScript
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        // load JSON as JSON-parsed object
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        // extract CSS into separate files
        test: /\.css$/,
        loader: "style!css"
      },
      {
        // images
        test: /\.png$/,
        loader: "file-loader?name=./images/[name].[ext]"
      },
      {
        // html
        test: /\.html$/,
        loader: "file-loader?name=./[name].[ext]"
      }
    ]
  },
  node: {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
