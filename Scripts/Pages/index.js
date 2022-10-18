async function logIn() {
    var users = {};

    var mainOrderNum = curOrderNum++;
    await getSheetData(userDatabaseGSID, "Sheet1", mainOrderNum);
    getOrder(mainOrderNum).forEach(userPair => {
        users[userPair[0]] = userPair[1];
    });

    var userInput = document.getElementById("userInputOne").value.toLowerCase();
    var passInput = document.getElementById("passwordInput").value;
    var validUser = false;

    var userInputElement = document.getElementById("userInputOne");
    if (userInput != "") {
        if (Object.keys(users).includes(userInput)) {
            setText("userInputOneNotif", "");
            userInputElement.style.border = "1px solid black";

            validUser = true;
        } else {
            setText("userInputOneNotif", "There is no account with this username!");
            userInputElement.style.border = "1px solid #f06767";
        }
    } else {
        setText("userInputOneNotif", "Username is a required field!");
        userInputElement.style.border = "1px solid #f06767";
    }

    var passwordInputElement = document.getElementById("passwordInput");
    if (passInput != "") {
        if (validUser && users[userInput] == passInput) {
            setText("passwordInputNotif", "");
            passwordInputElement.style.border = "1px solid black";

            sessionStorage.setItem("userName", userInput.charAt(0).toUpperCase() + userInput.slice(1));
            changeScreen("Pages/welcome.html");
        } else if (validUser) {
            setText("passwordInputNotif", "This is not the correct password!");
            passwordInputElement.style.border = "1px solid #f06767";
        } else {
            setText("passwordInputNotif", "");
            passwordInputElement.style.border = "1px solid black";
        }
    } else {
        setText("passwordInputNotif", "Password is a required field!");
        passwordInputElement.style.border = "1px solid #f06767";
    }
}

async function continueAsGuest() {
    var passcodes = {};

    var mainOrderNum = curOrderNum++;
    await getSheetData(passcodeGSID, "Sheet1", mainOrderNum);
    getOrder(mainOrderNum).forEach(userPair => {
        passcodes[userPair[1]] = userPair[0];
    });

    var passcodeInput = document.getElementById("passcodeInput").value;

    var passcodeInputElement = document.getElementById("passcodeInput");
    if (passcodeInput != "") {
        if (Object.keys(passcodes).includes(passcodeInput)) {
            sessionStorage.setItem("userName", passcodes[passcodeInput]);
            changeScreen("Pages/welcome.html");
        } else {
            setText("passcodeInputNotif", "This is not a valid passcode!");
            passcodeInputElement.style.border = "1px solid #f06767";
        }
    } else {
        setText("passcodeInputNotif", "Passcode is a required field!");
        passcodeInputElement.style.border = "1px solid #f06767";
    }
}