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
        compile: function(tElement, attr) {
            return function(scope, element, attrs, controller, transclude) {
                scope.$watchCollection(attrs.nodes, function(newValue, oldValue) {
                    if (newValue !== oldValue) {
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
            require: '?treecursive',
            template: '<li></li>',
            compile: function(cElement, cAttrs, cTransclude) {
                return function(scope, element, attrs, controller, transclude) {
                    transclude(function(clone) {
                        if (innerElement === null) {
                            innerElement = clone.clone();
                        }
                        angular.element(clone[1]).attr('ng-click', false);
                        element.append(clone);
                    });
                    var updateChildren = function() {
                        var attrs = [];
                        angular.forEach(['ng-hide', 'ng-if'], function(attr) {
                            var val = angular.element(innerElement[1]).attr(attr);
                            if (angular.isDefined(val)) {
                                attrs.push(attr + '="' + val + '"');
                            }
                        });
                        var newTree = angular.element('<treecursive ' + attrs.join(' ') + ' ng-show="!node.collapsed" nodes="node.children"></treecursive>');
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
                };
            }
        };
    }
]);