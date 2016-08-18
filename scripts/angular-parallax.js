'use strict';

angular.module('angular-parallax', [
]).directive('parallax', ['$window', function ($window) {
  return {
    restrict: 'A',
    scope: {
      parallaxRatio: '@',
      parallaxVerticalOffset: '@',
      parallaxHorizontalOffset: '@',
    },
    link: function ($scope, elem, attrs) {

      var setPosition = function () {

        if (!$scope.parallaxHorizontalOffset) $scope.parallaxHorizontalOffset = 0;

        var position = (angular.element('.page-scroll-content').offset().top * -1) + 112;


        var calcValY = position * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1);

        if (calcValY < 12) {
          calcValY = 0;
        }
        if (calcValY <= $window.innerHeight) {

          var topVal = (calcValY > $scope.parallaxVerticalOffset ? $scope.parallaxVerticalOffset : calcValY);
          elem.css('transform', 'translate(' + $scope.parallaxHorizontalOffset + 'px, ' + topVal + 'px)');
        }
      };

      setPosition();

      // angular.element($window).bind("scroll", setPosition);
      // angular.element($window).bind("touchmove", setPosition);
      angular.element('.page-scroll').bind("scroll", setPosition);
      angular.element('.page-scroll').bind("touchmove", setPosition);
    }  // link function
  };
}]).directive('parallaxBackground', ['$window', function ($window) {
  return {
    restrict: 'A',
    transclude: true,
    template: '<div ng-transclude></div>',
    scope: {
      parallaxRatio: '@',
    },
    link: function ($scope, elem, attrs) {
      var setPosition = function () {

        var position = (angular.element('.page-scroll-content').offset().top * -1) + 112;

        // var calcValY = (elem.prop('offsetTop') - $window.pageYOffset) * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1 );
        var calcValY = (elem.prop('offsetTop') - position) * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1);
        // horizontal positioning
        elem.css('background-position', "50% " + calcValY + "px");
      };

      // set our initial position - fixes webkit background render bug
      angular.element($window).bind('load', function (e) {
        setPosition();
        $scope.$apply();
      });

      // angular.element($window).bind("scroll", setPosition);
      // angular.element($window).bind("touchmove", setPosition);
      angular.element('.page-scroll').bind("scroll", setPosition);
      angular.element('.page-scroll').bind("touchmove", setPosition);
    }  // link function
  };
}]);
