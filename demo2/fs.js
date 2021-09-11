const fs = require('fs');
const Buffer = require('buffer').Buffer;
const data = new Uint8Array(Buffer.from('Hello Node.js'));
fs.readFile('server1.js', data, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data.toString())
    }
})