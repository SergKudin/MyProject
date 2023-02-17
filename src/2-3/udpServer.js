const udp = require('dgram');
const server = udp.createSocket('udp4');

server.on('error', (err) => {
  console.log(`error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  let message = `Message: ${msg}
Remote IP Address:Port = ${rinfo.address}:${rinfo.port}
Time = ${new Date()}`;

  console.log(message);

  const response = Buffer.from(msg);

  server.send(response, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error('Failed to send response !!');
    } else {
      console.log('Response send Successfully');
    }
  });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`listening ${address.address}:${address.port}`);
});

server.bind(8082, '127.0.0.1');