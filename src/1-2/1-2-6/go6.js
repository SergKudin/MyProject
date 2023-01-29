const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

//-----Constants-------
const port = 8000;
const file = '\\data\\visiter.txt'

app.get('/hello', (req, res) => {
    res.send(visitCounter());
});

app.listen(port, () => {
    console.log(`Server started: http://localhost:${port}`)
});

let visitCounter = function () {
    let visitor = getVisitor() || 1;
    return `Hello!!! Congratulations, you are the ${visitor}th visitor to this site.`
}

function getVisitor() {
    let pathFile = path.resolve(__dirname) + path.normalize(file);
    let fileContents = null;
    try {
        fileContents = fs.readFileSync(pathFile, 'utf8');
    } catch (error) {
        fs.writeFileSync(pathFile, '0');
        fileContents = '0';
    };
    fileContents = (parseInt(fileContents) + 1) + '';
    try {
        fs.writeFileSync(pathFile, fileContents);
    } catch (error) {
    }
    return fileContents;
}