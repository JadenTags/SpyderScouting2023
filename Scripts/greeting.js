function setGreeting() {
    var hours = new Date().getHours();
    var greeting;
  
    if (hours >= 5 && hours <= 12) {
      greeting = "Good Morning, ";
    } else if (hours > 12 && hours <= 18) {
      greeting = "Good Afternoon, ";
    } else {
      greeting = "Good Evening, ";
    }
  
    document.getElementById("greetingText").innerHTML = greeting + userName;
  }
  
  setGreeting();