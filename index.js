const ora = require('ora');
const rm = require('rimraf');
const argv = require('yargs').argv;
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

// creates spinner to show progress
let spinner = false;

if (!argv.dev) {
    spinner = ora('building for production...');
    // starts spinner
    spinner.start();
}


// clean build folder
// keep only what matters
rm(path.join('./build/**/*'), err => {
    if (err) throw err;

    // starts webpack
    webpack(webpackConfig, (err, status) => {
        // stops spinner
        if (!argv.dev) {
            spinner.stop();
        }

        // shows error if any
        if (err) throw err;

        // logs results
        process.stdout.write(status.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        // if on dev mode, remembers user that webpack is still watching file changes
        if (argv.dev) {
            console.log('webpack watching for file changes');
        }
    });
})
