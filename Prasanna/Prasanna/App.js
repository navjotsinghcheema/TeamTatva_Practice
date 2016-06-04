<<<<<<< HEAD
var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.when("", "/page1");

     $stateProvider
        .state("page1", {
            url: "/page1",
            templateUrl: "Page-1.html"
        })
        .state("page2", {
            url:"/page2",
            templateUrl: "Page-2.html"
        })
        .state("page3", {
            url:"/page3",
            templateUrl: "Page-3.html"
        });
});
=======
var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.when("", "/page1");

     $stateProvider
        .state("page1", {
            url: "/page1",
            templateUrl: "Page-1.html"
        })
        .state("page2", {
            url:"/page2",
            templateUrl: "Page-2.html"
        })
        .state("page3", {
            url:"/page3",
            templateUrl: "Page-3.html"
        });
});
>>>>>>> 91a19d8c6cb6a76a4e716366d46e46cb75949bf6
