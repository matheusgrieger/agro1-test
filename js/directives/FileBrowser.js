'use strict';
var angular = require('angular');

/**
 * mgFileBrowser declaration
 * Module: app
 */
angular
    .module('app')
    .directive('mgFileBrowser', FileBrowserDirective);

/**
 * FileBrowserDirective function declaration
 */
function FileBrowserDirective() {
    /**
     * Directive declaration
     */
    var directive = {
        restrict: 'A', // attribute only directive
        link: function(scope, element) {
            element.on('click', function() {
                element.children()[0].click();
            });
        }
    };
    return directive;

}
