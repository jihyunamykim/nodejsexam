var crypto = require('crypto');

var password = 'test1234!@#$';
var shasum = crypto.createHash('sha256');
shasum.update(password);

var output = shasum.digest('hex');

console.log('password = ' +password);
console.log('hash=' +output);
