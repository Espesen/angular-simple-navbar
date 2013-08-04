Simple navbar module for AngularJS. Set your routes in your main module's config block and your navbar will be
created automatically. Navbar listens for $routeChangeSuccess events so if you change your route with $location.path()
navbar will be updated.

Routes are set using method addRoute of routeListProvider:

    routeListProvider.addRoute(url, title, route);
    
where ```url``` and ```title``` are strings and ```route``` is an object that is sent as such to 
$routeProvider. You can set property ```initialRoute``` to ```true``` to redirect your app to this 
route on startup. 

    routeListProvider.otherwise(route);
    
is a wrapper of ```routeProvider.otherwise```.
    
Example:

    angular.module('myApp', ['angularSimpleNavBar'])
      .config(function(routeListProvider) {
        routeListProvider.addRoute('/route1', 'Route 1', { template: 'Route 1' });
        routeListProvider.addRoute('/route2', 'Route 2', { template: 'Route 2', initialRoute: true });
        routeListProvider.addRoute('/route3', 'Route 3', { template: 'Route 3' });
      });

And in your HTML, throw in

    <simple-nav-bar></simple-nav-bar>

where you want your navbar to appear.
