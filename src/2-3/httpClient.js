const http = require('http');
const { url } = require('inspector');

const options = {
  method: 'GET',
};

const urlReq = 'http://127.0.0.1:3000/echo?message=';
const sendNassage = 'Hallo word!';
let start = new Date();

let request = http.request(`${urlReq}${sendNassage}`, options, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
    res.resume();
    return;
  }

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('close', () => {
    console.log('Retrieved all data');
    console.log(data);
    console.log(`Check response = ${(data.trim().localeCompare(sendNassage)) ? 'no ok' : 'ok'}`);
    console.log(`Totall time ${new Date() - start}ms`);
  });
});

request.end();

request.on('error', (err) => {
  console.error(`Encountered an error trying to make a request: ${err.message}`);
});