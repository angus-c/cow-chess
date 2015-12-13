module.exports = {
    entry: [
      './src/views/chess',
      './src/images/w-pawn.png',
      './src/images/w-knight.png',
      './src/images/w-bishop.png',
      './src/images/w-rook.png',
      './src/images/w-queen.png',
      './src/images/w-king.png',
      './src/images/b-pawn.png',
      './src/images/b-knight.png',
      './src/images/b-bishop.png',
      './src/images/b-rook.png',
      './src/images/b-queen.png',
      './src/images/b-king.png'
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
        // {
        //   test: /\.js$/,
        //   loader: 'jsx-loader?harmony'
        // },
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
        }
      ]
    }
};
