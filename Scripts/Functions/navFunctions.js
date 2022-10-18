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
        await getCurMatchNum(closestCompData[0].key, orderNum);
        curMatch = getOrder(orderNum);
    }

    if (closestCompData) {
        var orderNum = curOrderNum++;
        await getTBAData(tbaApiRoot + "team/frc1622/event/" + closestCompData[0].key + "/matches", orderNum);
        var matches = getOrder(orderNum);
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
    await getCurMatchNum(closestCompData[0].key, orderNum);
    var curMatch = getOrder(orderNum);

    while (true) {
        await wait(3000);
        
        orderNum = curOrderNum++;
        await getCurMatchNum(closestCompData[0].key, orderNum);
        let tempMatch = getOrder(orderNum);

        if (curMatch != tempMatch) {
            curMatch = tempMatch;
            changeMatchStatus(curMatch);
        }
    }
}

changeCompText();
changeMatchStatus(null);
periodicCheckMatch();