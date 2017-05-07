var angular = require('angular');
var db = require('./database');

db.then(function(database) {
    // creates app module
    require('./module');
    // register everything the app needs before starting it
    require('./controllers');
    require('./directives');

    angular.bootstrap(document.getElementsByTagName('html'), ['app'], {
        strictDi: true
    });

    // adds SCSS file
    require('~/scss/main.scss');
});
