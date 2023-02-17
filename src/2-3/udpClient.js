const udp = require('dgram')

const client = udp.createSocket('udp4')
const port = 8082
const hostname = '127.0.0.1'
const sendNassage = 'Hallo word!';
let start = new Date();

client.on('message', (message, info) => {
  const data = message.toString();
  console.log('Retrieved all data');
  console.log(data);
  console.log(`Check response = ${(data.trim().localeCompare(sendNassage)) ? 'no ok' : 'ok'}`);
  console.log(`Totall time ${new Date() - start}ms`);
  console.log('Server sadress:port ', info.address, ':', info.port)
})

const packet = Buffer.from(sendNassage)

client.send(packet, port, hostname, (err) => {
  if (err) {
    console.error('Failed to send packet !!')
    client.close();
  } else {
    console.log('Packet send !!')
  }
});

