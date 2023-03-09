(function() {
    // Get the current composition's frame rate
    var comp = app.project.activeItem;
    var frameRate = comp.frameRate;

    // Create a new UI panel
    var myPanel = new Window("palette", "My Panel", undefined, {
      resizeable: true
    });
    
    // Create a group for the text input field and label
    var textInputGroup = myPanel.add("group", undefined, "Text Input Group");
    var textInputLabel = textInputGroup.add("statictext", undefined, "BPM:");
    var textInput = textInputGroup.add("edittext", undefined, "120");
    textInput.characters = 5;
  
    // Create a group for the first drop-down menu and label
    var dropdown1Group = myPanel.add("group", undefined, "Dropdown 1 Group");
    var dropdown1Label = dropdown1Group.add("statictext", undefined, "Interval:");
    var dropdown1 = dropdown1Group.add("dropdownlist", undefined, ["1", "1/2", "1/4", "1/8", "1/16", "1/4T", "1/8T"]);
    dropdown1.selection = 2;
  
    // Add a button to the panel
    var markerButton = myPanel.add("button", undefined, "Add Markers");
    var keyframesButton = myPanel.add("button", undefined, "Add Keyframes");
    var selectKeyframesButton = myPanel.add("button", undefined, "Select Alternating Keyframes");

  
    // Set the layout of the UI elements
    myPanel.layout.layout(true);
  
 // Define the function to run when the button is clicked
 markerButton.onClick = function() {
    var x = parseFloat(textInput.text);
    var y = frameRate;
    var formula;

    // Determine which formula to use based on the selected value of the first drop-down menu
    switch (dropdown1.selection.text) {
      case "1":
        formula = ((60 / x) * 4) * y;
        break;
      case "1/2":
        formula = ((60 / x) * 2) * y;
        break;
      case "1/4":
        formula = (60 / x) * y;
        break;
      case "1/8":
        formula = ((60 / x) * 0.5) * y;
        break;
      case "1/16":
        formula = ((60 / x) * 0.25) * y;
        break;
    }

app.beginUndoGroup("My Undo Group");
    placeMarkers();

function placeMarkers() {
    // Get the active composition
    var comp = app.project.activeItem;
    
    // Get the current time
    var currentTime = comp.time;
    
    // Loop through every 30 frames
    for (var i = 0; i < comp.duration * comp.frameRate; i += formula) {
      // Calculate the time of the current marker
      var markerTime = i / comp.frameRate;
      
      // Add a marker to the current time with a comment of "Marker"
      comp.layer(1).property("Marker").setValueAtTime(currentTime + markerTime, new MarkerValue("Marker"));
    }
  }
  };
  app.endUndoGroup();

  keyframesButton.onClick = function() {
    var x = parseFloat(textInput.text);
    var y = frameRate;
    var formula;

    // Determine which formula to use based on the selected value of the first drop-down menu
    switch (dropdown1.selection.text) {
      case "1":
        formula = ((60 / x) * 4) * y;
        break;
      case "1/2":
        formula = ((60 / x) * 2) * y;
        break;
      case "1/4":
        formula = (60 / x) * y;
        break;
      case "1/8":
        formula = ((60 / x) * 0.5) * y;
        break;
      case "1/16":
        formula = ((60 / x) * 0.25) * y;
        break;
      case "1/4T":
        formula = ((60 / x) * (2/3)) * y;
      case "1/8T":
        formula = ((60 / x) * (1/3)) * y;    
    }

    app.beginUndoGroup("My Undo Group 2");
    function addKeyframes() {
        // Get the active composition
        var comp = app.project.activeItem;
        
        // Get the selected property
        var prop = comp.selectedProperties[0];
    
        var currentTime = comp.time;
        
        // Check if a property is selected
        if (!prop) {
          alert("Please select a property to add keyframes to.");
          return;
        }
        
        // Loop through every 30 frames
        for (var i = 0; i < comp.duration * comp.frameRate; i += formula) {
          // Calculate the time of the current keyframe
          var keyframeTime = i / comp.frameRate;
          
          // Add a keyframe to the selected property at the current time
          prop.addKey(currentTime + keyframeTime);
        }
      }
    addKeyframes();
    
    }

    selectKeyframesButton.onClick = function() {
        function selectEveryOtherKeyframe(property) {
            var keyframes = property.selectedKeys;
            if (keyframes.length > 0) {
              var firstKeyframeIndex = keyframes[0];
              for (var i = firstKeyframeIndex; i <= property.numKeys; i += 2) {
                property.setSelectedAtKey(i, true);
              }
            }
          }
          
          var selectedProperty = app.project.activeItem.selectedLayers[0].selectedProperties[0];
          selectEveryOtherKeyframe(selectedProperty);
        }
        app.endUndoGroup();

    // Show the panel
    myPanel.show();
  })();
  