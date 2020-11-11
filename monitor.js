var request = require('request');
require('dotenv').config();

var options = {
  'method': 'GET',
  'url': process.env.ENDPOINT,
  'headers': {
    'Cookie': process.env.COOKIE
  }
};

setInterval(function(){
  request(options, function (error, response) {
    if (error) throw new Error(error);
    let lolBigObj = JSON.parse(response.body);
    console.log("ping!");
  })}, 15000);
