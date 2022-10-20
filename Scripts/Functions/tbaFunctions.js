var tbaHeaders = new Headers({
  "X-TBA-Auth-Key" : tbaKey,
});
var tbaKeyBody = 'X-TBA-Auth-Key=' + tbaKey;
var tbaApiRoot = 'https://www.thebluealliance.com/api/v3/';

async function getTBAData(link, orderNum) {
  fetch(link, {
    method: 'GET',
    headers: tbaHeaders,
  })
    .then(response => response.json())
    .then(data => orderStorage[orderNum] = data);

  while (!orderStorage[orderNum]) {
      await wait(100);
  }
}

async function getClosestCompData(teamNum, mainOrderNum) {
  var orderNum = curOrderNum++;
  await getTBAData(tbaApiRoot + "team/frc" + teamNum + "/events", orderNum);
  var closestComp = getOrder(orderNum).reverse().filter(comp => new Date(comp.end_date).getTime() > testDate.getTime()).sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())[0];
  
  if (!closestComp) {
    return [];
  }

  var difference = (new Date(closestComp.start_date).getTime() - testDate.getTime()) / (1000 * 60 * 60 * 24);
  orderStorage[mainOrderNum] = [closestComp, difference];
}

async function getCurMatch(eventKey, mainOrderNum) {
  var orderNum = curOrderNum++;
  await getTBAData(tbaApiRoot + "event/" + eventKey + "/matches", orderNum);
  var tempMatches = getOrder(orderNum);
  var matches = [];

  ["qm", "ef", "qf", "sf", "f"].forEach(level => {
    matches = matches.concat(tempMatches.filter(x => x.comp_level == level).sort((a, b) => a.match_number - b.match_number));
  });

  matches = matches.map(x => {
    if (x.match_number > finishedMatches) {
      x.actual_time = null;
    }

    return x;
  });

  var curMatch = 0;
  for (var i = 0; i < matches.length; i++) {
    if (matches[i].actual_time != null) {
      curMatch++;
    } else {
      break;
    }
  }
  
  orderStorage[mainOrderNum] = matches[curMatch];
}