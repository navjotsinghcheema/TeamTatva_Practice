<<<<<<< HEAD
angular.module('myApp',['ui.router'])
  .config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/teams')
  $stateProvider.state('teams',{
    url:'/teams',
    templateUrl:'teams.html',
    controller: function($scope){
      $scope.allTeams=["Tatva","QuizRT","buggers"];
    }
  })
  .state('teams.team1',{
    url:'/team:Tatva',
    templateUrl:'team.html',
    controller:$scope.members=["nav","tapas","gurleen"]
  })
  .state('teams.team1.member',{
    url:'/member',
    templateUrl:'member.html',
    controller:'getMember'
  })
);
}
=======
angular.module('myApp',['ui.router'])
  .config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/teams')
  $stateProvider.state('teams',{
    url:'/teams',
    templateUrl:'teams.html',
    controller: function($scope){
      $scope.allTeams=["Tatva","QuizRT","buggers"];
    }
  })
  .state('teams.team1',{
    url:'/team:Tatva',
    templateUrl:'team.html',
    controller:$scope.members=["nav","tapas","gurleen"]
  })
  .state('teams.team1.member',{
    url:'/member',
    templateUrl:'member.html',
    controller:'getMember'
  })
);
}
>>>>>>> 91a19d8c6cb6a76a4e716366d46e46cb75949bf6
