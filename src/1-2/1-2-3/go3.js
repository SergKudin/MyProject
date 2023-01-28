function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }
    return res;
}

let contents = readHttpLikeInput();

// function outputHttpResponse(statuscode, statusmessage, headers, body) {
//     return `HTTP/1.1 ${statuscode} ${statusmessage}
//   Date: ${headers.Date}
//   Server: ${headers.Server}
//   Content - Length: ${headers.ContentLength}
//   Connection: ${headers.Connection}
//   Content - Type: ${headers.ContentType}

//     ${body} `
// }

function processHttpRequest($method, $uri, $headers, $body) {
    const headers = {
        Date: new Date(),
        Server: 'Apache/2.2.14 (Win32)',
        ContentLength: '',
        Connection: 'Closed',
        ContentType: 'text/html; charset=utf-8',
    }

    let outputHttpResponse = function (statuscode, statusmessage, headers, body) {
        headers.ContentLength = (body + '').length;
        return `HTTP/1.1 ${statuscode} ${statusmessage}
Date: ${headers.Date}
Server: ${headers.Server}
Connection: ${headers.Connection}
Content-Type: ${headers.ContentType}
Content-Length: ${headers.ContentLength}

${body} `
    }

    // method level
    if ($method.includes('GET')) {
        // task level
        if ($uri.includes('/sum')) {
            // level of task arguments
            if ($uri.includes('?nums=')) {
                const sum = $uri
                    .slice($uri.indexOf('=') + 1)
                    .split(',')
                    .map(n => parseInt(n))
                    .reduce((sum, current) => sum + current);
                return outputHttpResponse(200, 'OK', headers, sum);
            } else {
                return outputHttpResponse(400, 'Bad Request', headers, 'bad request');
            }
        } else {
            return outputHttpResponse(404, 'Not Found', headers, 'not found');
        }
    } else {
        return outputHttpResponse(400, 'Bad Request', headers, 'bad request');
    }
}

function parseTcpStringAsHttpRequest(string) {
    const simSplit = (index) => {
        if (index === 0) {
            return ' ';
        } else {
            return ':';
        }
    };

    const arrDataRequest = string.split(`\n`).map((item, index) => item.split(simSplit(index))).filter((item) => (item != ''));
    const arrLength = arrDataRequest.length - 1;
    const headers = arrDataRequest
        .filter((item, index) => (index !== 0) & (index !== arrLength))
        .reduce((acc, item) => {
            acc[item[0]] = item[1];
            return acc;
        }, {});
    let tcpStringAsHttpRequest = {
        method: arrDataRequest[0][0],
        uri: arrDataRequest[0][1],
        headers,
        body: ((arrLength > 0) & (arrDataRequest[arrLength].length < 2)) ? (arrDataRequest[arrLength][0]) : ''
    };
    return tcpStringAsHttpRequest;
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);

console.log(processHttpRequest(http.method, http.uri, http.headers, http.body));
// node tester.js 3 go3.js