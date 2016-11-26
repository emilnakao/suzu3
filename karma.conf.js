/**
 * Created by emilnakao on 11/26/16.
 */

var webpack = require('webpack');
var webpackConfig = require('./webpack.dev');

module.exports = function(config){
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            'src/**/*.spec.ts'
        ],
        preprocessors: {
            'src/**/*.spec.ts' : ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        }
    })
}