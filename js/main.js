var angular = require('angular');

// load Angular dependencies
require('angular-animate');
require('angular-material');
require('angular-messages');
require('@uirouter/angularjs');
require('ngstorage');

angular.module('app', [
    'ngAnimate',
    'ngMessages',
    'ngMaterial',
    'ui.router',
    'ngStorage'
]);

angular.bootstrap(document.getElementsByTagName('html'), ['app'], {
    strictDi: true
});

// adds SCSS file
require('root/scss/main.scss');
