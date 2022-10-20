var curMatchId;

async function fillInfo() {
    await waitGlobalData();

    document.getElementById("compName").innerHTML = closestCompData[0].name;

    var address = document.getElementById("compAddress");

    address.innerHTML = closestCompData[0].address;
    address.setAttribute("href", closestCompData[0].gmaps_url);

    document.getElementById("compWeek").innerHTML = "Week " + closestCompData[0].week;
    document.getElementById("compDates").innerHTML = formatDateString(new Date(closestCompData[0].start_date)) + " - " + formatDateString(new Date(closestCompData[0].end_date));
    // document.getElementById("compWebsite").setAttribute("src", closestCompData[0].website);
    // document.getElementById("compWebsite").setAttribute("height", screen.height - 100 + "px;");

    fillMatches();
}

async function fillMatches() {
    var orderNum = curOrderNum++;
    await getCurMatch(closestCompData[0].key, orderNum);
    var curMatch = getOrder(orderNum);

    orderNum = curOrderNum++;
    await getTBAData(tbaApiRoot + "event/" + closestCompData[0].key + "/matches", orderNum);
    var matches = getOrder(orderNum).sort((a, b) => a.predicted_time - b.predicted_time);

    matches.forEach(match => {
        let time = new Date(match.predicted_time * 1000);

        if (!document.getElementById(formatDateString(time))) {
            let t = document.createElement("table");
            let body = document.createElement("tbody");
            let tr = document.createElement("tr");
            let title = document.createElement("h1");

            t.setAttribute("class", "matchesDisplayTable center");
            body.id = formatDateString(time);
            title.setAttribute("class", "title");
            tr.innerHTML = "<th>#</th><th>Time</th><th>Blue 1</th><th>Blue 2</th><th>Blue 3</th><th>Red 1</th><th>Red 2</th><th> Red 3</th><th>Winner</th>"

            title.appendChild(document.createTextNode(formatDateString(time)));
            document.getElementById("matchesDiv").appendChild(title);
            body.appendChild(tr);
            t.appendChild(body);
            document.getElementById("matchesDiv").appendChild(t);
        }

        let body = document.getElementById(formatDateString(time));
        let tr = document.createElement("tr");
        let blueAlliance = match.alliances.blue.team_keys.map(x => x.substring(3));
        let redAlliance = match.alliances.red.team_keys.map(x => x.substring(3));

        let matchNum = createNewTD(match.match_number);
        matchNum.id = match.match_number + match.comp_level + match.set_number + "Matches#";
        matchNum.style.fontWeight = "bolder";
        matchNum.style.height = "40px";

        if (match.match_number == curMatch.match_number && match.set_number == curMatch.set_number && match.comp_level == curMatch.comp_level) {
            curMatchId = matchNum.id;
            matchNum.style.backgroundColor = "black";
        }

        matchNum.setAttribute("class", "matchesTableCell");
        tr.appendChild(matchNum);

        time = createNewTD(convertMilitaryTime(time.toTimeString().substring(0, 5)));
        time.setAttribute("class", "matchesTableCell");
        tr.appendChild(time);

        let isBlue = true;
        [blueAlliance, redAlliance].forEach(alliance => {
            alliance.forEach(team => {
                let teamNode = createNewTD(team);

                if (isBlue) {
                    teamNode.style.backgroundColor = "#9dc1e0";
                } else {
                    teamNode.style.backgroundColor = "#e3a3ac";
                }

                if (team == "1622") {
                    teamNode.style.backgroundColor = "white";
                }

                teamNode.setAttribute("class", "matchesTableCell");
                tr.appendChild(teamNode);
            });

            isBlue = false;
        });

        let winningAlliance = createNewTD(match.winning_alliance);
        winningAlliance.setAttribute("class", "matchesTableCell");
        tr.appendChild(winningAlliance);

        // console.log(formatDateString(time), convertMilitaryTime(time.toTimeString().substring(0, 5)))
        // console.log(match)

        body.appendChild(tr);
    });

    //Match num, red alliance, blue alliance, winner and arrow on left side pointing at cur match
}

async function periodicCheckMatchesMatch() {
    await waitGlobalData();

    while (true) {
        await wait(3000);
        
        let orderNum = curOrderNum++;
        await getCurMatch(closestCompData[0].key, orderNum);
        let match = getOrder(orderNum);
        let tempMatchId = match.match_number + match.comp_level + match.set_number + "Matches#";

        if (tempMatchId != curMatchId) {
            document.getElementById(curMatchId).style.backgroundColor = "white";
            document.getElementById(tempMatchId).style.backgroundColor = "black";
            curMatchId = tempMatchId;
        }
    }
}

fillInfo();
periodicCheckMatchesMatch();