const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

//-----Constants-------
const port = 8000;
const fileCounter = 'visiter.txt'
const pathData = 'data'

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
    let pathFile = path.join(__dirname, pathData, fileCounter);
    let fileContents = 0;
    try {
        fileContents = fs.readFileSync(pathFile, 'utf8');
    } catch (error) { };
    try {
        fileContents = (parseInt(fileContents) + 1) + '';
        fs.writeFileSync(pathFile, fileContents);
    } catch (error) {
        fileContents = null;
    }
    return fileContents;
}