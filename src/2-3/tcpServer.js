const net = require('net');

const server = net.createServer((c) => {
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });

  c.on('data', function (data) {
    let msg = data.toString();
    let message = `Message: ${msg}
Remote IP Address:Port = ${c.remoteAddress}:${c.remotePort}
Time = ${new Date()}`;
    console.log(message);
    c.write(msg);
  });

});


server.on('error', (err) => {
  throw err;
});


server.listen(8124, '127.0.0.1', () => {
  console.log('server bound');
});