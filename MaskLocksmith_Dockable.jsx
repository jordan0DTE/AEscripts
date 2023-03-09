(function(thisObj) {

// Any code you write here will execute before the panel is built.

buildUI(thisObj); // Calling the function to build the panel

‍

function buildUI(thisObj) {

var windowName = "your script name";

  var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("window", windowName, undefined, {
          resizeable: true
     });

      // Write any UI code here. Note: myPanel is your window panel object. If you add groups, buttons, or other UI objects make sure you use myPanel as their parent object, especially if you are using the only ScriptUI panel builder.
// Add a "Lock Masks" button to the window
var lockButton = myPanel.add("button", undefined, "Lock Masks");

// Add an event listener that runs the lockMasks function when the button is clicked
lockButton.onClick = function() {
  app.beginUndoGroup("My Undo Group");
  var selectedLayers = app.project.activeItem.selectedLayers;
  if (selectedLayers.length > 0) {
    // Iterate through each selected layer
    for (var i = 0; i < selectedLayers.length; i++) {
      var selectedLayer = selectedLayers[i];

      // Get the mask parade for the selected layer
      var maskParade = selectedLayer.property("ADBE Mask Parade");
    
      // Iterate through each mask in the mask parade
      for (var j = 1; j <= maskParade.numProperties; j++) {
        // Lock the current mask
        var mask = maskParade.property(j);
        mask.locked = true;
      }
    }
  }
  app.endUndoGroup();
}

// Add an "Unlock Masks" button to the window
var unlockButton = myPanel.add("button", undefined, "Unlock Masks");

// Add an event listener that runs the unlockMasks function when the button is clicked
unlockButton.onClick = function() {
  app.beginUndoGroup("My Undo Group");
  var selectedLayers = app.project.activeItem.selectedLayers;
  if (selectedLayers.length > 0) {
    // Iterate through each selected layer
    for (var i = 0; i < selectedLayers.length; i++) {
      var selectedLayer = selectedLayers[i];

      // Get the mask parade for the selected layer
      var maskParade = selectedLayer.property("ADBE Mask Parade");
    
      // Iterate through each mask in the mask parade
      for (var j = 1; j <= maskParade.numProperties; j++) {
        // Unock the current masks
        var mask = maskParade.property(j);
        mask.locked = false;
      }
    }
  }
  app.endUndoGroup();
}

‍
     myPanel.onResizing = myPanel.onResize = function() {
        this.layout.resize();
     };
     if (myPanel instanceof Window) {
        myPanel.center();
        myPanel.show();
     } else {
        myPanel.layout.layout(true);
        myPanel.layout.resize();
     }

}

// Write your helper functions here

})(this);





