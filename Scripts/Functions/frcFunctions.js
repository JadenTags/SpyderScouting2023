var frcHeaders = new Headers({
    "Authorization" : "Basic " + frcKeyEncoded,
    "Content-Type": "application/json"
  });
  var frcApiRoot = 'https://frc-api.firstinspires.org';
  
  async function getFRCData(link, orderNum) {
    fetch(link, {
      method: 'GET',
      headers: frcHeaders
    })
      .then(response => console.log(response.json()))
      .then(data => console.log(data));
  
    while (!orderStorage[orderNum]) {
        await wait(100);
    }
  }

//   getFRCData(frcApiRoot + "/v2.0/2021", 1);
//FIX LATER