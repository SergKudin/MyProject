// этот файл надо будет дописать...

// не обращайте на эту функцию внимания 
// она нужна для того чтобы правильно читать входные данные
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

// вот эту функцию собственно надо написать
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
console.log(JSON.stringify(http, undefined, 2));