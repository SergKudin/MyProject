const http = require('http');
const url = require('url');

const server = new http.Server(function (req, res) {

  let urlParsed = url.parse(req.url, true);
  const ip = res.socket.remoteAddress;
  const port = res.socket.remotePort;
  let message = `Message: ${urlParsed.query.message}
Remote IP Address:Port = ${ip}:${port}
Time = ${new Date()}`;
  console.log(message);
  console.log(req.headers);


  if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
    res.statusCode = 200; // Ok
    res.end(urlParsed.query.message);
  } else {
    res.statusCode = 404; // Not Found
    res.end("Page not found");
  }
});

server.on('clientError', (err, socket) => {
  const ip = socket.remoteAddress;
  const port = socket.remotePort;
  let message = `Client Error
Message: ${err.code}
Remote IP Address:Port = ${ip}:${port}
Time = ${new Date()}`;
  console.log(message);
  if (err.code === 'ECONNRESET' || !socket.writable) {
    return;
  }
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.on('close', (socket) => {
  const ip = socket.remoteAddress;
  const port = socket.remotePort;
  let message = `Client close
Remote IP Address:Port = ${ip}:${port}
Time = ${new Date()}`;
  console.log(message);
});

server.on('connection', (stream) => {
  console.log('someone connected!');
});

server.listen(3000, '127.0.0.1');