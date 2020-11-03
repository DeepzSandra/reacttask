var webpack = require('webpack')

module.exports = {
  entry: ['./app/main.jsx'],

  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],

  // module: {
  //   loaders: [
  //     { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
  //   ]
  // }
    module: {

    // apply loaders to files that meet given conditions
    loaders: [{
      exclude: /node_modules/,
      test: /\.jsx?$/,
     // include: path.join(__dirname, '/client/src'),
      loader: 'babel-loader',
      query: {
        presets: ["react", "es2015"]
      }
    },
    {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }]
  },
  devServer: {
    proxy: {'**': 'http://[::1]:8081'}
  }
}
