const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
  id: 10
}

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);
// var message = 'helloo hahahaha';
// var hash = SHA256(message).toString();
//
// console.log(`${message}: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(resultHash === token.hash){
//   console.log('Data has not changed');
// }else{
//   console.log('Data has changed');
// }
