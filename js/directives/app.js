var angular = require('angular');

angular
    .module('app')
    .directive('app', AppDirective);

function AppDirective() {
    return {
        template: '<span>Hello world</span>'
    }
}
