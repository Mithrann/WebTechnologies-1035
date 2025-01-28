var weatherApp = angular.module('WeatherApp', []);

weatherApp.controller('WeatherController', function ($scope, $http) {
    $scope.city = ""; // User input for the city
    $scope.weatherData = {};
    $scope.errorMessage = "";
    $scope.favoriteCities = [];

    $scope.fetchWeather = function () {
        const apiKey = "421809047614d6115ac018cea7ab1126"; // Replace with your API key

        // Ensure city name is trimmed and encoded to avoid issues with spaces or special characters
        const cityName = $scope.city.trim();
        if (!cityName) {
            $scope.errorMessage = "Please enter a city name.";
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        $http.get(url).then(
            function (response) {
                $scope.weatherData = {
                    city: cityName,
                    temperature: response.data.main.temp,
                    humidity: response.data.main.humidity,
                    condition: response.data.weather[0].description,
                };
                $scope.errorMessage = ""; // Clear any previous error messages
            },
            function (error) {
                console.error(error); // Log error details for debugging
                $scope.errorMessage = "City not found or API error. Please try again.";
            }
        );
    };

    $scope.addToFavorites = function () {
        const cityName = $scope.city.trim();
        if (cityName && !$scope.favoriteCities.includes(cityName)) {
            $scope.favoriteCities.push(cityName);
        }
    };
});

weatherApp.filter('alphabetical', function () {
    return function (input) {
        return input.sort();
    };
});
