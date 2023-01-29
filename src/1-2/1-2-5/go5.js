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

const CodeRequest = {
    200: 'OK',
    400: 'Bad Request',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error'
}

const Host = new Map([
    ['student.shpp.me', 'student'],
    ['another.shpp.me', 'another'],
])

let contents = readHttpLikeInput();

function processHttpRequest($method, $uri, $headers, $body) {
    const headers = {
        Date: new Date(),
        Server: 'Apache/2.2.14 (Win32)',
        ContentLength: '',
        Connection: 'Closed',
        ContentType: 'text/html; charset=utf-8',
    }

    let outputHttpResponse = function (statuscode, headers, body) {
        let statusmessage = CodeRequest[statuscode];
        headers.ContentLength = (body + '').length;
        return `HTTP/1.1 ${statuscode} ${statusmessage}
  Date: ${headers.Date}
  Server: ${headers.Server}
  Content-Length: ${headers.ContentLength}
  Connection: ${headers.Connection}
  Content-Type: ${headers.ContentType}
        
  ${body} `
    }

    // method level
    if ($method.includes('GET')) {
        // task sum level
        if ($uri.includes('/sum')) {
            // level of task arguments
            if ($uri.includes('?nums=')) {
                return outputHttpResponse(200, headers, getSum($uri));
            } else {
                return outputHttpResponse(400, headers, 'bad request');
            }
        } else {
            const output = getFileFromAdress($uri, $headers);
            return outputHttpResponse(output.code, headers, output.fileContents);
        }
    } else if ($method.includes('POST')) {
        // task LoginAndPassword level
        if ($uri.includes('/api/checkLoginAndPassword')) {
            const dataBoby = $body.split(/=|&/gm);
            const arrPass = getPasswords();
            if (!arrPass) {
                return outputHttpResponse(500, headers, 'internal server error')
            }
            let body = (arrPass.has(dataBoby[1])) ? '<h1 style="color:green">FOUND</h1>' : '<h1 style="color:red">NOT FOUND</h1>';
            return outputHttpResponse(200, headers, body);
        } else {
            return outputHttpResponse(404, headers, 'not found');
        }
    } else {
        return outputHttpResponse(400, headers, 'bad request');
    }
}

function getSum(param) {
    return param
        .slice(param.indexOf('=') + 1)
        .split(',')
        .map(n => parseInt(n))
        .reduce((sum, current) => sum + current);
}

function getPasswords(file = 'passwords.txt') {
    // return require('fs').readFileSync(file);
    const fs = require('fs');
    const path = require('path');
    let pass = null;
    try {
        pass = new Map(fs.readFileSync(path.resolve(__dirname, file), 'utf8')
            .split('\r\n')
            .map(item => item.split(':')));
    } catch (error) {
    }
    return pass;
}

function getFileFromAdress($uri, $headers) {
    const fs = require('fs');
    const path = require('path');
    let file = path.normalize(($uri !== '/') ? $uri : '/index.html');
    let pathFile = path.resolve(__dirname, '../fileServer/' + '/'
        + Host.get($headers.Host.trim()) || 'else');
    let fileContents = null;
    try {
        fileContents = fs.readFileSync(pathFile + file, 'utf8');
    } catch (error) {
    };
    return {
        code: (fileContents) ? 200 : 404,
        fileContents: (fileContents) ? fileContents : 'not found',
    };
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
// node tester.js 5 go5.js