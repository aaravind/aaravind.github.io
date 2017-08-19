var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DIST_DIR = path.resolve(__dirname, "masterdist");
var SRC_DIR = path.resolve(__dirname, "master");
// let extractSCSS = new ExtractTextPlugin('./styles/main.scss');
var config = {
  entry: {
    bundle:path.resolve(__dirname, 'master/index'),
    vendor:['react','react-dom','redux','react-router','react-router-redux','redux-thunk','jquery']
  },
  target: 'web',
  output: { 
    path: __dirname + '/masterdist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
  },
  plugins: [
 new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
new ExtractTextPlugin("[name].css",{
       allChunks : false
     }),
new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
new webpack.optimize.AggressiveMergingPlugin(),
new webpack.optimize.OccurrenceOrderPlugin(),
new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
        ascii_only: true
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    })
  ],
  postcss: [
    require('autoprefixer')
  ],
  module: {
        loaders: [
            {
                test: /\.js?/,  
                include: SRC_DIR,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
            {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style","css?importLoaders=1!postcss-loader!sass?outputStyle=expanded")
        // loader: "style!css!postcss-loader!sass?outputStyle=expanded"
        // loader : 'style!css!autoprefixer?browsers=last 3 versions!sass?outputStyle=expanded!postcss-loader'
      },
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                loader: 'url-loader?limit=100000' 
            }
        ]
    }
};

module.exports = config;
