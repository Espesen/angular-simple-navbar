
angular.module('angularSimpleNavBar', [])
  .provider('routeList', ['$routeProvider', function($routeProvider) {
    
    var routes = []
      , initialRouteIndex = 0;
    
    this.addRoute = function(url, routeTitle, route) {
      if (route.initialRoute) {
        initialRouteIndex = routes.length;
        delete route.initialRoute;
      }
      $routeProvider.when(url, route);
      routes.push({ url: url, title: routeTitle });
    };

    this.otherwise = function(params) {
      $routeProvider.otherwise(params);
    };
    
    this.$get = function() {
      return {
        initialRouteIndex: initialRouteIndex,
        routes: routes
      };
    };
    
  }])
  
  .directive('simpleNavBar', ['routeList', '$location', function(routeList, $location) {
    
    var template = '<ul>' +
                      '<li ng-repeat="item in navList">' +
                        '<a ng-class="{active:item.active}" href="#{{item.url}}">{{item.title}}</a>' +
                      '</li>' +
                    '</ul>';
                    
    return {
      restrict: 'E',
      template: template,
      scope: true,
      link: function($scope, $elem, $attrs) {
        
        $scope.navList = routeList.routes;
        $location.path(routeList.routes[routeList.initialRouteIndex].url);
        
        function detectRoute() {
          angular.forEach($scope.navList, function(item) {
            item.active = $location.path().match(new RegExp(item.url)) ? true : false;
          });  
        }
        
        $scope.$on('$routeChangeSuccess', detectRoute);
      }
    };
    
  }]);

  
    
  
