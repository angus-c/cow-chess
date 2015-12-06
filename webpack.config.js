module.exports = {
    entry: './src/chess.js',
    output: {
        path: 'bundle',
        filename: 'chess.js'
    },
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
          }
        ]
    }
};
