'use strict';
var angular = require('angular');

/**
 * nationality declaration
 * Module: app
 */
angular
    .module('app')
    .filter('nationality', NationalityFilter);

/**
 * NationalityFilter function declaration
 */
function NationalityFilter() {
    var nations = {
        BR: 'Brazilian',
        JP: 'Japanese',
        US: 'American'
    };

    return function(input) {
        return nations[input] || 'Unknown';
    }
}
