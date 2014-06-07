'use strict';
angular.module('webpolis.directives', []).directive('treecursive', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        controller: function($scope, $element, $attrs) {
            $scope.treecursiveNodes = $scope.$eval($attrs.nodes);
        },
        template: '<ol class="treecursive"><treecursive-node ng-repeat="node in treecursiveNodes track by $id(node)"><div ng-transclude></div></treecursive-node></ol>',
    };
}).directive('treecursiveNode', function($compile) {
    var innerElement = null;
    return {
        restrict: 'E',
        replace: true,
        require: '?treecursive',
        template: '<li></li>',
        compile: function(cElement, cAttrs, cTransclude) {
            return function(scope, element, attrs, controller, transclude) {
                cTransclude(scope, function(clone, innerScope) {
                    if (innerElement === null) {
                        innerElement = clone.clone();
                    }
                    element.append(clone);
                });
                var updateChildren = function() {
                    var newTree = angular.element('<treecursive ng-show="!node.collapsed" nodes="node.children"></treecursive>');
                    newTree.append(innerElement);
                    element.find('ol.treecursive').remove();
                    element.append(newTree);
                    $compile(element.contents())(scope);
                };
                scope.$watchCollection('node.children', function(n, o) {
                    if (n !== o && angular.isArray(n) && n.length > 0) {
                        updateChildren();
                    }
                });
                $compile(element.contents())(scope);
            };
        }
    };
});