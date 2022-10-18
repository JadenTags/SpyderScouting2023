async function storeGlobalData() {
    if (globalDataStored != "") {
        var orderNum = curOrderNum++;
        await getClosestCompData(1622, orderNum);
        var closestComp = getOrder(orderNum);
        sessionStorage.setItem("closestCompData", JSON.stringify(closestComp));
        closestCompData = JSON.parse(sessionStorage.getItem("closestCompData"));

        if (!closestCompData) {
            sessionStorage.setItem("closestCompText", "No Future Competitions");
        } else {
            var comp = closestCompData[0];
            var daysAway = closestCompData[1];
            
            if (daysAway > 1) {
                sessionStorage.setItem("closestCompText", comp.name + "<br>" + daysAway + " Days Away");
            } else if (daysAway == 1) {
                sessionStorage.setItem("closestCompText", comp.name + "<br>Tomorrow");
            } else {
                sessionStorage.setItem("closestCompText", comp.name);
            }
        }

        closestCompText = sessionStorage.getItem("closestCompText");
        sessionStorage.setItem("globalDataStored", "");
        globalDataStored = "";
    }
}

storeGlobalData();