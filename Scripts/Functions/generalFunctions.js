function hideElement(elementId) {
    document.getElementById(elementId).style.display = "none";
}

function showElement(elementId, displayType) {
    document.getElementById(elementId).style.display = displayType;

}

function toggleElement(elementId, displayType) {
    if (document.getElementById(elementId).style.display == "none") {
        document.getElementById(elementId).style.display = displayType;
    } else {
        document.getElementById(elementId).style.display = "none";
    }
}

function setText(id, text) {
  document.getElementById(id).innerHTML = text;
}

async function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve();
      }, time
    );
  });
}

function getOrder(orderNum) {
  var temp = orderStorage[orderNum];
  delete orderStorage[orderNum];

  return temp;
}

function changeScreen(location) {
  window.location.replace(location);
}

async function waitGlobalData() {
  while (!globalDataStored) {
    await wait(100);
  }
}