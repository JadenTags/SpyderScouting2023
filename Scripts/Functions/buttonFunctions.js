function activateButtons() {
  Array.from(document.getElementsByClassName("navButton")).forEach(navButton => {
    let buttonOnclick = navButton.getAttribute("onclick");

    if (!buttonOnclick) {
      buttonOnclick = "";
    }

    buttonOnclick += "showElement('titleDiv', 'block');";

    Array.from(document.getElementsByClassName("navButton")).map(x => x.id.replace("Button", "Div")).forEach(div => {
      if (navButton.id.replace("Button", "Div") != div) {
        buttonOnclick += "hideElement('" + div + "');";
      } else {
        buttonOnclick += "toggleElement('" + div + "', 'block'); if (document.getElementById('" + div + "').style.display == 'none') {showElement('titleDiv', 'block');} else {hideElement('titleDiv', 'block');};";
      }
    });

    
    navButton.setAttribute("onclick", "toggleButton(\'" + navButton.id + "\', \'" + navButton.getAttribute("class").split(" ")[0] + "\');" + buttonOnclick);
  });

  Array.from(document.getElementsByClassName("button")).forEach(button => {
    let buttonOnclick = button.getAttribute("onclick");

    if (!buttonOnclick) {
      buttonOnclick = "";
    }
    
    if (button.getAttribute("class").split(" ").indexOf("lockableButton") != -1) {
      button.setAttribute("onclick", "if (document.getElementById(\'" + button.id + "\').getAttribute('class').split(' ').indexOf('lockedButton') == -1) {toggleButton(\'" + button.id + "\', null);" + buttonOnclick + "};");
    } else {
      button.setAttribute("onclick", "toggleButton(\'" + button.id + "\', null);" + buttonOnclick);
    }
  });
  
  Array.from(document.getElementsByClassName("groupedButton")).forEach(groupedButton => {
    let buttonOnclick = groupedButton.getAttribute("onclick");

    if (!buttonOnclick) {
      buttonOnclick = "";
    }

    
    groupedButton.setAttribute("onclick", "toggleButton(\'" + groupedButton.id + "\', \'" + groupedButton.getAttribute("class").split(" ")[0] + "\');" + buttonOnclick);
  });
}

function toggleButton(buttonId, buttonClass) {
  if (buttonClass) {
    Array.from(document.getElementsByClassName(buttonClass)).forEach(groupedButton => {
      if (groupedButton.value && groupedButton.id != buttonId) {
        toggleButton(groupedButton.id, null);
      }
    });
  }
    
  var button = document.getElementById(buttonId);
  var buttonClasses = button.getAttribute("class");
  
  if (!button.value) {
    button.value = true;
    
    button.setAttribute("class", "selectedButton " + buttonClasses);
  } else {
    button.value = false;
    
    button.setAttribute("class", buttonClasses.split(" ").slice(1).join(" "));
  }
}

function navButtonFunction(divId, divIds) {
  var showTitle = true;
  hideElement("titleDiv");
  
  divIds.forEach(divId => {
    hideElement(divId);
  });

  toggleElement(divId, "inline");

  divIds.push(divId);
  
  divIds.forEach(divId => {
    if (document.getElementById(divId).style.display != "none") {
      showTitle = false;
    }
  });

  if (showTitle) {
    document.getElementById("titleDiv").style.display = "inline";
    document.getElementsByTagName("body")[0].setAttribute("class", "noscroll");
  } else {
    document.getElementsByTagName("body")[0].setAttribute("class", "");
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

activateButtons();