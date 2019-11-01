
var path = require('path')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const output_dir = path.resolve(__dirname, '../docs')
const src_dir = path.resolve(__dirname, './')
const public_out_dir = path.join(output_dir, "public")
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')

module.exports = {
  entry: path.join(src_dir, '/index.ts'),
  output: {
    path: output_dir,
    publicPath: "",
    filename: 'public/js/[name].[hash].js',
    chunkFilename: 'public/js/[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: ['/client/src/index.html']
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json', '.html', ".svg", "."],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      //'assets': public_src_dir
    },
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new NamedModulesPlugin(),
    // new CopyWebpackPlugin([{
    //     from: public_src_dir,
    //     to: public_out_dir
    //   } ])
  ]
}