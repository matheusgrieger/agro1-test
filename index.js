const ora = require('ora');
const rm = require('rimraf');
const argv = require('yargs').argv;
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

let spinner = false;

if (!argv.dev) {
    spinner = ora('building for production...');
    spinner.start();
}

rm(path.join('./build/**/*'), err => {
    if (err) throw err;
    webpack(webpackConfig, (err, status) => {
        if (spinner) {
            spinner.stop();
        }

        if (err) throw err;

        process.stdout.write(status.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        if (argv.dev) {
            console.log('webpack watching for file changes');
        }
    });
})
