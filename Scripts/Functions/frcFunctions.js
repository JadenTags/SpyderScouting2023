var frcHeaders = new Headers({
    "Authorization" : "Basic " + frcKeyEncoded,
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': "*"
  });
  var frcApiRoot = 'https://frc-api.firstinspires.org';
  
  async function getFRCData(link, orderNum) {
    fetch(link, {
      method: 'GET',
      headers: frcHeaders
    })
      .then(response => response.json())
      .then(data => console.log(data));
  
    while (!orderStorage[orderNum]) {
        await wait(100);
    }
  }

  getFRCData(frcApiRoot + "/v2.0/:season", 1);