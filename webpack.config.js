module.exports = {
  entry: './src/Specification.ts',
  output: {
      path: './dist/',
      filename: 'specification.js',
      libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
}
