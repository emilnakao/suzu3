/**
 * Created by emilnakao on 11/26/16.
 */

var webpack = require('webpack');
var webpackConfig = require('./webpack.dev');

/**
 * tip for running chrome on travis found on
 * https://swizec.com/blog/how-to-run-javascript-tests-in-chrome-on-travis/swizec/6647
 * http://blog.500tech.com/setting-up-travis-ci-to-run-tests-on-latest-google-chrome-version/
 *
 * @param config
 */
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
        reporters: ['mocha'],
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
    });

    if(process.env.TRAVIS){
        config.browsers = ['Chrome_travis_ci'];
    }
}