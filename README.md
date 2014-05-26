##Angular-Treecursive
#### Customizable recursive tree for angular.
#####by Nicolas Iglesias <nico@webpolis.com.ar>
<br>
This directive will help you to display a nested tree in your Angular project, and customize the nodes by using your own template or HTML code, without nasty configuration options. There is no limit for your trees, as long as you respect a similar JSON structure:

```javascript
$scope.myTree = [
    {
        name: 'John',
        collapsed: true
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
There are no specific properties required for your nodes, other than the `children` property which is *only needed* if you want to include more nodes. Then you can traverse into infinite levels!
<br>
So, for example:
```
<treecursive nodes="myTree" on-select="treeNodeSelected">
    <a href="" ng-click="node.collapsed = !node.collapsed; $emit('selectNode', node)">{{node.name}}</a>
</treecursive>
```
As you can see, the members of your tree are represented by `node`, so you can do whatever you want there, like I did by managing the *collapsed* state. 
###Configuration
Configuration is simple; we just need two attributes: `nodes` (*required*), specifying the name of the array for your tree, and `on-select`(*optional*), which specifies a name of the method you want to execute once the `selectNode`event is emmited from within the directive.
So, whenever you want to do something with the *node*, you just do `$emit('selectNode', node)` and the method you defined in **on-select** will be executed and will receive the node as unique argument.
> I know you may wonder why using an event instead of a plain function. The issue is that this directive requires the transclusion feature from Angular, in whose context the directive's main scope is not inherited by the nodes generated recursively. I will check further this issue and update when possible.

###Some words
I prefer to use the *transclusion* instead of hardcoding the output of the directive to make it more customizable, and to avoid confusion by requesting the developers long and nasty configuration options. You are free to choose the way you build the nodes.
