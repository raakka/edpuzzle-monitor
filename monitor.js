var request = require('request');
require('dotenv').config();

var options = {
  'method': 'GET',
  'url': process.env.ENDPOINT,
  'headers': {
    'Cookie': process.env.COOKIE
  }
};

request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
