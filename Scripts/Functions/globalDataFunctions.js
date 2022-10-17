async function storeGlobalData() {
    if (!globalDataStored) {
        var orderNum = curOrderNum++;
        await getClosestCompData(1622, orderNum);
        var closestComp = getOrder(orderNum);

        closestCompData = closestComp;

        if (!closestCompData) {
            closestCompText = "No Future Competitions";
        } else {
            var comp = closestCompData[0];
            var daysAway = closestCompData[1];
            
            if (daysAway > 1) {
                closestCompText = comp.name + "<br>" + daysAway + " Days Away";
            } else if (daysAway == 1) {
                closestCompText = comp.name + "<br>Tomorrow";
            } else {
                closestCompText = comp.name;
            }
        }
        
        globalDataStored = true;
    }
}

storeGlobalData();