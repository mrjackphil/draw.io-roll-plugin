Draw.loadPlugin(function(ui) {
    // Adds resource for rolling button
       mxResources.parse('roll=Let\'s roll')
    
       let uiCreatePopupMenu = ui.menus.createPopupMenu;
       ui.menus.createPopupMenu = function(menu, cell, evt)
       {
           uiCreatePopupMenu.apply(this, arguments);
           
           let graph = ui.editor.graph;
           if (graph.model.isVertex(graph.getSelectionCell()))
           {
               this.addMenuItems(menu, ['-', 'roll'], null, evt);
           }
       };
    
        ui.actions.addAction('roll', function()
        {
           let value = ui.editor.graph.getSelectionCell().value;
           alert(roll(value));
        });
    
    function roll(roll,output) {
        let dice;
        let count;
        let arr = [];
        let sum = 0;
        let max = 99999;

        count = roll.indexOf('d');
        count = roll.slice(0,count);
        dice  = roll.replace(count+"d","");

        if (dice.indexOf("+") !== -1 || dice.indexOf("-") !== -1){
            let diceWithMod = dice;


            let plus = dice.indexOf("+");
            let minus = dice.indexOf("-");
            if (plus === -1){plus = max};
            if (minus === -1){minus = max};

            if (plus < minus){
                dice = dice.slice(0, dice.indexOf("+"));
            }else{
                dice = dice.slice(0, dice.indexOf("-"));
            }
        }

        for (let i=0; i < count; i++){
            arr[i] = Math.floor(Math.random() * dice + 1);
            sum += arr[i];
        }

        let r = count+"d"+dice;
        let l = roll.replace(r,"");
        l = addbits(l);
        sum += l;  

        let message = "" +
        "You roll: " + sum + 
        "\nDices results: " + arr +
        "\nModificators: " + l;

        if (typeof output !== "undefined"){
           switch (output){
              case "sum":
               return sum;
              case "arr":
               return arr;
              case "r":
               return r;
              case "l":
               return l;
           }                                 
        }

        return message;
    };

    function addbits(s){
        let total= 0, s= s.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];
        while(s.length){
            total+= parseFloat(s.shift());
        }
        return total;
    }
})