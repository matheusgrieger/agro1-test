var angular = require('angular');

// load Angular dependencies
require('angular-animate');
require('angular-material');
require('angular-messages');
require('@uirouter/angularjs');
require('ngstorage');

// creates Angular module
angular.module('app', [
    'ngAnimate',
    'ngMessages',
    'ngMaterial',
    'ui.router',
    'ngStorage'
]);
angular.module('app').config(Config).run(Run);

// module's config function
Config.$inject = [
    '$mdThemingProvider',
    '$urlRouterProvider',
    '$stateProvider',
    '$locationProvider',
    '$compileProvider'
];
function Config($mdThemingProvider, $urlRouterProvider, $stateProvider, $locationProvider, $compileProvider) {
    // disables debugging and class/comments compilation
    // $compileProvider.debugInfoEnabled(false);
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);

    // configures theming
    // app-wide default
    $mdThemingProvider.theme('default')
        .primaryPalette('light-blue')
        .accentPalette('deep-purple')
        .warnPalette('orange');
    $mdThemingProvider.enableBrowserColor({
        theme: 'default',
        palette: 'primary'
    });

    // sets up login checking
    $stateProvider.decorator('data', function(state, parent) {
        var stateData = parent(state);
        var data = stateData || {};

        state.resolve= state.resolve || {};

        if (typeof(data.restricted) !== 'undefined') {
            state.resolve.security = Security;
        }

        Security.$inject = ['Auth'];

        function Security(Auth) {
            return Auth.checkLogin();
        }

        return stateData;
    });

    // set 404 route for not found
    $urlRouterProvider.otherwise('/404');

    // define app routes
    $stateProvider
        // error 404
        .state('e404', {
            url: '/404',
            views: {
                main: {
                    // TODO: template and configure
                }
            }
        })

        // login
        .state('login', {
            url: '/login?redirect',
            views: {
                main: {
                    // TODO: template and configure
                }
            }
        })

        // logout
        .state('logout', {
            url: '/logout',
            views: {
                main: {
                    template: ''
                    // TODO: add controller
                }
            }
        })

        // home
        .state('home', {
            url: '/',
            views: {
                main: {
                    // TODO: template and configure
                }
            }
        })
}

// module's run function
Run.$inject = [
    '$rootScope',
    '$state'
];
function Run($rootScope, $state) {
    // redirects to login on auth error
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error == 'auth') {
            // sends back to login state with query param "redirect" populated with errored state and params
            // so we know where to redirect the user back after successfully logging in
            var redirect = JSON.stringify({
                state: toState.name,
                params: toState.params
            });
            $state.go('login', {
                redirect: btoa(redirect) // base64 to avoid exposing JSON data in URL
            });
        }
    });

    // everything loaded, let's remove the preloader overlay
    document.getElementById('preloader').remove();
}
