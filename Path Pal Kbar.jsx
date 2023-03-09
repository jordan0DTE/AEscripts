
var globalTime = -1;
var selectedLayers = app.project.activeItem.selectedLayers;
var myState = ScriptUI.environment.keyboardState;


function selectmyPath() {
    // Select the shape layer
var shapeLayer = app.project.activeItem.selectedLayers[0];

// Check if the selected layer is a shape layer
function convertPath() {
if (shapeLayer.matchName == "ADBE Vector Layer") {
if (shapeLayer.property("Contents")(1)("Contents")(1).property.matchName = "Path") {
var parametricShape = shapeLayer.property("Contents")(1)("Contents")(1);
parametricShape.selected = true;
app.executeCommand(4162);
}
} else {
alert("That's not a shape layer but good try. Hint: Shape Layers have Shapes in them.");
}
}

function selectPath() {
if (shapeLayer.matchName == "ADBE Vector Layer") {
var myPath = shapeLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Group").property("ADBE Vector Shape").selected = true;
myPath.property(1).selected = true;
}
}

convertPath(function() {
selectPath();
});
}








//
//


function keyframeClick() {
	app.beginUndoGroup("My Undo Group");
	if (app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
	  alert("Please select a composition");
	  return false;
	}
  
	var comp = app.project.activeItem;
	if (comp.selectedProperties == null || comp.selectedProperties.length < 1) {
	  alert("You've strayed from your path, please return to it");
	  return false;
	}
  
	var selectedProperties = comp.selectedProperties;
	var time = comp.time;
  
	for (var i = 0; i < selectedProperties.length; i++) {
	  if (isKeyAtThisTime(selectedProperties[i], time)) {
		return false;
	  }
	}
  
	autoKeyHere(selectedProperties, time);
  }
  
  function isKeyAtThisTime(prop, time) {
	for (var i = 1; i <= prop.numKeys; i++) {
	  if (prop.keyTime(i) == time) {
		return true;
	  }
	}
  
	return false;
  }
  
  function autoKeyHere(props, keyTime) {
	for (var i = 0; i < props.length; i++) {
	  if (props[i].numKeys < 1) {
		var myLayers = app.project.activeItem.selectedLayers;
  
		//Loop through selected layers
		for (var i = 0; i < myLayers.length; i++) {
		  myLayer = myLayers[i];
		  if (myLayer instanceof ShapeLayer) {
			var myContents = myLayer.property("Contents");
			propertySearch(myContents);
		  }
		}

function propertySearch(a) {
	var comp = app.project.activeItem;
	var time = comp.time
  for (var j = 1; j <= a.numProperties; j++) { 
    for (var k = 1; k <= a.property(j).numProperties; k++) { 
      if (a.property(j).property(k) == a.property(j).property("ADBE Vector Shape")) { 
        a.property(j).property(k).addKey(time); 
      } 
      propertySearch(a.property(j).property(k)); 
    } 
  } 
} 
		}
		else if(isKeyAtThisTime(props[i], keyTime) == null) {
			props[i].setValueAtTime(keyTime, props[i].value);
		}

	}
	app.endUndoGroup();
}

//
//
app.beginUndoGroup("My Last Undo Group");
if (myState.shiftKey) {
   keyframeClick ();
}
else
{
    selectmyPath();
}
app.endUndoGroup();















