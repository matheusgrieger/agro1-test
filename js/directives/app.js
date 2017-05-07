var angular = require('angular');

angular
    .module('app')
    .directive('app', AppDirective);

function AppDirective() {
    return {
        template: require('~/html/directives/app.html')
    }
}
