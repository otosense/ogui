const path = require('path');
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './lib');
module.exports = {
  mode: 'production',
  entry: {
    main: './index.ts',
  },
  // entry: './index.ts',
  context: sourcePath,
  output: path.resolve(__dirname, "dist"),
  // output: {
  //   path: outPath,
  //   publicPath: '/',
  //   filename: 'index.js',
  // },
  target: 'web',
  // fileName: "index.js",
  resolve: {
    modules: [sourcePath, 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg', '.ttf'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: ['tslint-loader'],
    },{
        test: /\.tsx?$/,
        use: ['ts-loader'],
    }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use:'file-loader',
    }, {
        test: /\.svg$/,
        use: {
          loader: "svg-url-loader",
          options: {
            iesafe: true,
          },
        },
      },
],
},
externals: {
  "react": {
    "commonjs": "react",
    "commonjs2": "react",
    "amd": "react",
    "root": "React"
  },
  "react-dom": {
      "commonjs": "react-dom",
      "commonjs2": "react-dom",
      "amd": "react-dom",
      "root": "ReactDOM"
  },
  "@mui/material": "@mui/material",
  },
}