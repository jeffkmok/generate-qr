/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
const qr = require('qr-image');
const fs = require('fs');
const path = require('path');

async function askThenGenerateQR() {
    const inquirer = await import('inquirer');  

    const answers = await inquirer.default.prompt([  
        {
            type: 'input',
            name: 'url',
            message: 'Enter a URL to generate a QR code:',
        }
    ]);
    generateQR(answers.url);
}

function generateQR(url) {
    const qrSvg = qr.image(url, { type: 'png' });
    const qrStream = fs.createWriteStream(path.join(__dirname, 'QRCode.png'));
    qrSvg.pipe(qrStream);

    fs.writeFile(path.join(__dirname, 'URL.txt'), url, err => {
        if (err) throw err;
        console.log('The URL has been saved to URL.txt and the QR code generated as QRCode.png');
    });
}

askThenGenerateQR();






