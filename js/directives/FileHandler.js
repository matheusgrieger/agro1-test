'use strict';
var angular = require('angular');

/**
 * mgFileHandler declaration
 * Module: app
 */
angular
    .module('app')
    .directive('mgFileHandler', FileHandlerDirective);

/**
 * FileHandlerDirective injectables
 * @type {Array}
 */
FileHandlerDirective.$inject = [
    '$window'
];

/**
 * FileHandlerDirective function declaration
 */
function FileHandlerDirective($window) {
    /**
     * Directive declaration
     */
    var directive = {
        restrict: 'A', // attribute only directive
        scope: {
            mgFileModel: '='
        },
        link: function(scope, element) {
            element.on('change', function(event) {
                var file = event.target.files[0];
                var reader = new $window.FileReader();

                reader.onload = function(ev) {
                    var content = ev.target.result;
                    scope.mgFileModel = content;
                    scope.$apply();
                };

                reader.readAsDataURL(file);
            });
        }
    };
    return directive;
}
