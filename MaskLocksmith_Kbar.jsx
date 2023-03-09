var selectedLayers = app.project.activeItem.selectedLayers;
var myState = ScriptUI.environment.keyboardState;
app.beginUndoGroup("My Undo Group");
function lockMasks() {
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
}
app.endUndoGroup();

app.beginUndoGroup("My Other Undo Group");
function unlockMasks() {
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
}
app.endUndoGroup();

app.beginUndoGroup("My Last Undo Group");
if (myState.shiftKey) {
   unlockMasks ();
}
else
{
    lockMasks ();
    }      
app.endUndoGroup();