const path = require('path');
const argv = require('yargs').argv;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

// plugins used by production build
function prodPlugins() {
    return [
        // compresses JS
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // extracts all CSS into separate file
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
            allChunks: true
        }),
        // optimizes CSS to reduce size
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true // disables risky aggregations
            }
        }),
        // injects generated files into template HTML file
        // can also be configured to reduce HTML file size
        new HtmlWebpackPlugin({
            filename: path.resolve('./build/index.html'),
            template: 'index.html',
            inject: true,
            chunksSortMode: 'dependency'
        }),
        // divides common code into separate files
        // optimizes caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module, count) => {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.resolve('./node_modules')
                    ) === 0
                )
            }
        }),
        // creates separated file for webpack's bootstrap
        // avoid using it in every file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunk: ['vendor']
        })
    ];
}

// plugins used by development build
function devPlugins() {
    return [
        // extracts all CSS into separate file
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
        // injects generated files into template HTML file
        new HtmlWebpackPlugin({
            filename: path.resolve('./build/index.html'),
            template: 'index.html',
            inject: true,
            chunksSortMode: 'dependency'
        }),
        // divides common code into separate files
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module, count) => {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.resolve('./node_modules')
                    ) === 0
                )
            }
        }),
        // creates separated file for webpack's bootstrap
        // avoid using it in every file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunk: ['vendor']
        })
    ];
}

// base webpack configuration
var webpackBaseConfig = {
    // main file
    entry: {
        main: path.resolve('./js/main.js')
    },
    // destination path
    // file names merged afterwards
    output: {
        path: path.resolve('./build')
    },
    // shortcut to project root
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '~': path.resolve('./')
        }
    },
    module: {
        rules: [
            // pure-CSS loader
            // without preprocessors
            {
                test: /\.css$/,
                // being extracted
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: {
                                    safe: true
                                },
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'postcss-loader' // adds required vendor prefixes
                        }
                    ]
                })
            },
            // SCSS loader
            {
                test: /\.scss$/,
                // also being extracted
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: {
                                    safe: true
                                },
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // paths where to look for @import's
                                includePaths: ['scss', 'node_modules']
                            }
                        }
                    ]
                })
            },
            // HTML loader
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            attrs: false
                        }
                    }
                ]
            }
        ]
    }
};

// production build
if (!argv.dev) {
    // merges base config with following specifics
    module.exports = merge(webpackBaseConfig, {
        // set to subfolder "js" using chunkhash to allow caching
        output: {
            filename: 'js/[name].[chunkhash].js',
            chunkFilename: 'js/[id].[chunkhash].js'
        },
        // get all production plugins
        plugins: prodPlugins()
    });
}

// dev build
else {
    // merges base config with following specifics
    module.exports = merge(webpackBaseConfig, {
        // set to subfolder "js" without chunkhash
        // this will make webpack overwrite the files on every build
        // preventing lots of files from being created
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[id].js'
        },
        // get all development plugins
        plugins: devPlugins(),
        // sets up watch with 300ms interval between saving and recompiling
        watch: true,
        watchOptions: {
            aggregateTimeout: 300
        }
    });
}
