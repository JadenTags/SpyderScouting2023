var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
  while (globalDataStored != "") {
    await wait(100);
  }
}

function formatDateString(dateObj) {
  var day = dateObj.getDay();
  
  switch (day) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
         day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
  }

  var month = months[dateObj.getMonth()];

  return day + ", " + month + " " + dateObj.getDate();
}

function convertMilitaryTime(time) {
  var timeOfDay;

  time = time.split(":");

  if (Number(time[0]) / 12 < 1) {
      timeOfDay = "AM";
  } else {
      timeOfDay = "PM";
  }

  var hours = Number(time[0]) % 12;
  if (hours == 0) {
      hours = 12
  }

  return hours + ":" + time[1] + " " + timeOfDay;
}

function createNewTD(text) {
  var td = document.createElement("td");
  td.appendChild(document.createTextNode(text));

  return td;
}