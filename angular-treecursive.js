'use strict';
angular.module('webpolis.directives', []).directive('treecursive', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        controller: ['$scope', '$element', '$attrs', '$transclude',
            function($scope, $element, $attrs, $transclude) {
                this.$transclude = $transclude;
                $scope.treecursiveNodes = $scope.$eval($attrs.nodes);
            }
        ],
        template: '<ol class="treecursive"><treecursive-node ng-repeat="node in treecursiveNodes track by $id(node)"><div ng-transclude></div></treecursive-node></ol>',
        compile: function() {
            return function(scope, element, attrs, controller, transclude) {
                scope.$watchCollection(attrs.nodes, function(newValue, oldValue) {
                    if (!angular.equals(newValue, oldValue)) {
                        scope.treecursiveNodes = newValue;
                    }
                });
            };
        }
    };
}).directive('treecursiveNode', ['$compile',
    function($compile) {
        var innerElement = null;
        return {
            restrict: 'E',
            replace: true,
            require: '^treecursive',
            template: '<li></li>',
            link: function($scope, $element, $attrs, controller) {
                controller.$transclude($scope, function(clone) {
                    if (innerElement === null) {
                        innerElement = clone.clone();
                    }
                    $element.empty();
                    angular.element(clone[1]).attr('ng-click', false);
                    $element.append(clone);
                });
                if (angular.isArray($scope.node.children)) {
                    var sub = angular.element('<treecursive nodes="node.children" ng-show="!node.collapsed"></treecursive>');
                    sub.append(innerElement);
                    $element.append(sub);
                    $compile($element.contents())($scope);
                }
            }
        };
    }
]);