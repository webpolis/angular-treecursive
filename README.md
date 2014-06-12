##Angular-Treecursive
#### Customizable recursive tree for angular.
######by Nicolas Iglesias <nico@webpolis.com.ar> and awesome contributors
<br>
This directive will help you to display a nested tree in your Angular project, and customize the nodes by using your own template or HTML code, without nasty configuration options. There is no limit for your trees, as long as you respect a similar JSON structure:

```javascript
$scope.myTree = [
    {
        name: 'John'
    },
    {
        name: 'Marie'
    },
    {
        name: 'Jackie',
        children: [
            {
                name: 'Junior'
            },
            {
                name: 'Christie',
                children: [...]
            }
        ]
}];
```

Please checkout [this demo](http://jsfiddle.net/webpolis/TyxH8)

###Installation
You can install it via **bower** by doing `bower install angular-treecursive`.
Then, load the script file as you usually do:
```
<script src="bower_components/angular-treecursive/angular-treecursive.min.js"></script>
```

Lastly, include the module `webpolis.directives` in your app, like this:
```javascript
var myApp = angular.module('myApp', ['webpolis.directives']);
```

###Usage
There are no specific properties required for your nodes, other than the `children` property which is *only needed* if you want to include more nodes and the `collapsed` boolean attribute, in case you need to expand or collapse the children nodes. Then you can traverse into infinite levels!
<br>
So, for example:
```
<treecursive nodes="myTree">
    <a href="" ng-click="myCustomSelectionMethod(node)">{{node.name}}</a>
</treecursive>
```
As you can see, the members of your tree are represented by `node`, so you can do whatever you want there, like setting a `collapsed` property in your nodes to open/close a folder icon (See [demo](http://jsfiddle.net/webpolis/TyxH8)). 
###Configuration
Configuration is simple. We just need one attribute: `nodes` (*required*), specifying the name of the array for your tree.

