angular.module('MySliderAnimation',['ngMaterial'])
.controller('AppCtrl',function(){

})
.config(function($mdIconProvider){
  $mdIconProvider
     .iconSet('device', 'img/icons/sets/device-icons.svg', 24);
});
