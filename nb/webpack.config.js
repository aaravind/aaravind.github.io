var webpack = require('webpack');
var path = require("path");
var DIST_DIR = path.resolve(__dirname, "disttravel");
var SRC_DIR = path.resolve(__dirname, "travel");

var config = {
  debug: true,
  devtool: 'eval',
  noInfo: false,
  entry: {
    bundle:path.resolve(__dirname, 'travel/index'),
    vendor:['react','react-dom','redux','react-router','react-router-redux','redux-thunk','react-custom-scroll','jquery']
  },
  target: 'web',
  output: { 
    path: __dirname + '/traveldist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", Infinity)
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
            {test: /(\.scss)$/, loaders: ['style', 'css', 'sass']},
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                loader: 'url-loader?limit=100000' 
            }
        ]
    }
};

module.exports = config;
