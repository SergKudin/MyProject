const net = require('net');

const sendNassage = 'Hallo word!';
let start = new Date();

const client = net.connect({
  port: 8124,
  host: '127.0.0.1',
}, function () {
  console.log('connected to server!');
  client.write(sendNassage);
});

client.on('data', function (message) {
  const data = message.toString();
  console.log('Retrieved all data');
  console.log(data);
  console.log(`Check response = ${(data.trim().localeCompare(sendNassage)) ? 'no ok' : 'ok'}`);
  console.log(`Totall time ${new Date() - start}ms`);

  client.end();
});

client.on('end', function () {
  console.log('disconnected from server');
});