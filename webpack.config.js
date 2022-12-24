const path = require('path')

module.exports = {
  entry: './example/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'example'),
    },
    historyApiFallback: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              'macros',
              'preval',
              '@babel/plugin-syntax-dynamic-import',
            ],
          },
        },
      },
      {
        test: /\.raw.css$/i,
        use: path.resolve('./bundler/webpackRAWGraphCssLoader.js'),
        exclude: [path.resolve(__dirname, 'example')],
      },
      {
        test: /\.css$/i,
        use: 'raw-loader',
        exclude: [path.resolve(__dirname, 'example'), /\.raw.css$/i],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [path.resolve(__dirname, 'example')],
      },
      {
        test: /\.tsv$/,
        use: ['dsv-loader?delimiter=\t'],
      },
      {
        test: /\.csv$/,
        use: ['dsv-loader?delimiter=,'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      customcharts: path.resolve(__dirname, 'src'),
    },
  },
}
