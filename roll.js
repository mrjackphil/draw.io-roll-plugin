Draw.loadPlugin(function(ui) {
// Adds resource for action
   mxResources.parse('helloWorldAction=Hello, World!');

   // Adds action
   ui.actions.addAction('helloWorldAction', function() {
       var ran = Math.floor((Math.random() * 100) + 1);
       mxUtils.alert('A random number is ' + ran);
   });

   // Adds menu
   ui.menubar.addMenu('Hello, World Menu', function(menu, parent) {
       ui.menus.addMenuItem(menu, 'helloWorldAction');
   });

   // Reorders menubar
   ui.menubar.container.insertBefore(ui.menubar.container.lastChild,
       ui.menubar.container.lastChild.previousSibling.previousSibling);

   // Adds toolbar button
   ui.toolbar.addSeparator();
   var elt = ui.toolbar.addItem('', 'helloWorldAction');

   // Cannot use built-in sprites
   elt.firstChild.style.backgroundImage = 'url(https://www.draw.io/images/logo-small.gif)';
});