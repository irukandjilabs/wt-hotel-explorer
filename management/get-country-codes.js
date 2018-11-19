const https = require('https');

https.get('https://restcountries.eu/rest/v2/all', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const list = JSON.parse(data).map((c) => {
      return {
        name: c.name,
        code: c.alpha2Code,
      };
    });
    console.log(JSON.stringify(list));
  });
});
