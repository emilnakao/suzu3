var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var config = {
    entry: [
        'webpack-hot-middleware/client?reload=true&path=http://localhost:9000/__webpack_hmr',
        './src/index.tsx',
    ],
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/},
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
            }, {
                test: /\.png|\.svg$/,
                loaders: ['file-loader']
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.md$/,
                loader: 'markdown-loader'
            }
        ]
    },
    output: {
        path: __dirname + '/dist',
        publicPath: 'http://localhost:9000/dist/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', ".ts", ".tsx", "less", ".json", ".md"],
    },
    // resolve bundling com pouchdb (https://github.com/chentsulin/electron-react-boilerplate/issues/246)
    externals: [
        'leveldown'
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
