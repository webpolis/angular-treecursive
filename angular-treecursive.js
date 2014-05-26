'use strict';
angular.module('webpolis.directives', []).directive('treecursive', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            nodes: '=',
            select: '&onSelect'
        },
        controller: function($scope) {
            $scope.$on('selectNode', function(event, node) {
                if (angular.isDefined(node)) {
                    if (!angular.isDefined(node.children) || node.children.length <= 0) {
                        $scope.select()(node);
                    }
                }
            });
        },
        template: '<ol class="treecursive"><treecursive-node ng-transclude ng-repeat="node in nodes track by $id(node)" subnode="node" on-select="select"></treecursive-node></ol>',
    };
}).directive('treecursiveNode', function($compile) {
    var innerElement = null;
    return {
        restrict: 'E',
        replace: true,
        //require: '^treecursive',
        template: '<li></li>',
        scope: {
            subnode: '=',
            select: '&onSelect'
        },
        compile: function(cElement, cAttrs, cTransclude) {
            return function(scope, element) {
                cTransclude(scope.$parent.$parent.$new(), function(clone) {
                    if (innerElement === null) {
                        innerElement = clone.clone();
                    }
                    element.append(clone);
                });
                var updateChildren = function() {
                    var newTree = angular.element('<treecursive ng-show="!subnode.collapsed" nodes="subnode.children" on-select="select"></treecursive>');
                    newTree.append(innerElement);
                    element.find('ol.treecursive').remove();
                    element.append(newTree);
                    $compile(element.contents())(scope);
                };
                scope.$watchCollection('subnode.children', function(n, o) {
                    if (n !== o && angular.isArray(n) && n.length > 0) {
                        updateChildren();
                    }
                });
                if (angular.isArray(scope.subnode.children) && scope.subnode.children.length > 0) {
                    updateChildren();
                }
            };
        }
    };
});