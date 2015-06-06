/**
 * Created by maki.tolentino on 6/7/15.
 */
// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', '$location', function($scope, cityService, $location){
    $scope.city = cityService.city;

    $scope.submit = function(){
        $location.path("/forecast");
    };

    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService',
    function($scope, $resource, $routeParams, cityService){
        $scope.city = cityService.city;

        $scope.days = $routeParams.days || '2';

        $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
            { callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});

        $scope.weatherResult = $scope.weatherAPI.get({
            q: $scope.city,
            cnt: $scope.days
        });

        $scope.convertToCelcius = function(degreesInKelvin){
            return Math.round(degreesInKelvin - 273);
        };

        $scope.convertToDate = function(date){
            return new Date(date * 1000);
        }
    }]);
