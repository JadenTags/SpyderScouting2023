var gsHeaders = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  var authCodeLink = 'https://accounts.google.com/o/oauth2/token';
  var gsApiRoot = 'https://sheets.googleapis.com';
  var refreshTokenBody = 'grant_type=refresh_token&client_id=' + clientId + '&client_secret=' + clientSecret + '&refresh_token=' + refreshToken;

async function getGsKey(orderNum) {
    fetch(authCodeLink, {
      method: 'POST',
      headers: gsHeaders,
      body: refreshTokenBody
    })
      .then(reponse => reponse.json())
      .then(data => {
        
        var gsKey = new Headers({
          Authorization: 'Bearer ' + data.access_token,
        });
        
        orderStorage[orderNum] = gsKey;
      });
  
    while (!orderStorage[orderNum]) {
        await wait(100);
    }
}

async function getSheetData(gsId, sheet, mainOrderNum) {
  var http = gsApiRoot + '/v4/spreadsheets/' + gsId + '/values/' + sheet;

  var orderNum = curOrderNum++;
  await getGsKey(orderNum);

  fetch(http, {
    method: 'GET',
    headers: getOrder(orderNum),
  }) 
    .then(response => response.json())
    .then(data => {
      if (!data.values) {
        console.log("GET NEW REFRESH KEY");
      }
      
      orderStorage[mainOrderNum] = data.values;
    });

    while (!orderStorage[mainOrderNum]) {
        await wait(100);
    }
}