function toggleSidebar() {
    if (document.getElementById("sidebarDiv").style.marginLeft == "-250px") {
        document.getElementById("sidebarDiv").style.marginLeft = "0px";
        document.getElementById("menuBars").style.opacity = "0";
        document.getElementById("menuX").style.opacity = "100";
    } else {
        document.getElementById("sidebarDiv").style.marginLeft = "-250px";
        document.getElementById("menuBars").style.opacity = "100";
        document.getElementById("menuX").style.opacity = "0";
    }
}

async function changeCompText() {
    await waitGlobalData();

    var element = document.getElementById("closestCompText");
    element.innerHTML = closestCompText;
    element.style.display = "block";
}

async function changeMatchStatus(curMatch) {
    await waitGlobalData();

    if (!curMatch) {
        orderNum = curOrderNum++;
        await getCurMatch(closestCompData[0].key, orderNum);
        curMatch = getOrder(orderNum).match_number;
    }

    if (closestCompData) {
        var orderNum = curOrderNum++;
        await getTBAData(tbaApiRoot + "team/frc1622/event/" + closestCompData[0].key + "/matches", orderNum);
        var matches = getOrder(orderNum).sort((a, b) => a.match_number - b.match_number);
        var nextTeamMatch;
        var curParticipant = matches.map(x => x.match_number).includes(curMatch);
        
        matches.forEach(x => {
            if (!nextTeamMatch && x.match_number > curMatch) {
              nextTeamMatch = x.match_number;
            }
        });

        var matchDiff = nextTeamMatch - curMatch;
        var button = document.getElementById("matchStatus");
      
        if (curParticipant) {
          button.innerHTML = "We're in a Match!";
        } else if (!matchDiff) {
          button.innerHTML = "We're done!<br>Great Job!";
        } else if (matchDiff == 1) {
          button.innerHTML = "We're in Next Match!<br>Wish Us Luck!";
        } else {
          button.innerHTML = "Next Match in<br>" + matchDiff + " Matches";
        }

        button.style.display = "block";
    }
}

async function periodicCheckMatch() {
    await waitGlobalData();
    
    orderNum = curOrderNum++;
    await getCurMatch(closestCompData[0].key, orderNum);
    var curMatch = getOrder(orderNum).match_number;

    while (true) {
        await wait(3000);
        
        orderNum = curOrderNum++;
        await getCurMatch(closestCompData[0].key, orderNum);
        let tempMatch = getOrder(orderNum).match_number;

        if (curMatch != tempMatch) {
            curMatch = tempMatch;
            changeMatchStatus(curMatch);
        }
    }
}

async function checkGeneralInfo() {
    await waitGlobalData();

    if (closestCompData[1] > 0) {
        document.getElementById("generalInfoSidebarButton").style.display = "none";
    }
}

changeCompText();
changeMatchStatus(null);
checkGeneralInfo();
periodicCheckMatch();