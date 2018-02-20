const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test:/\.js$/
            },
            {
                use: ExtractTextWebpackPlugin.extract({
                    use: 'css-loader'
                }),
                test: /\.css$/
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('style.css')
  ]
};
module.exports = config;
