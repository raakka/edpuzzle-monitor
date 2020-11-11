var request = require('request');
require('dotenv').config();

var options = {
  'method': 'GET',
  'url': process.env.ENDPOINT,
  'headers': {
    'Cookie': process.env.COOKIE
  }
};

let msg = `{
  "embeds": [
    {
      "title": "New Edpuzzle",
      "fields": [
        {
          "name": "Assignment Id:",
          "value": "null"
        }
      ],
      "footer": {
        "text": "Powered by XVI#0016"
      }
    }
  ]
}`;

let whurls = [];
whurls = process.env.WEBHOOK;

function post2webhook(jsonmsg) {
  whurls.forEach((whurl, i) => {
    fetch(whurl + "?wait=true",
    {"method":"POST",
    "headers": {"content-type": "application/json"},
    "body": JSON.stringify(jsonmsg)})
    .then(a=>a.json()).then(console.log)
  });
}

setInterval(function(){
  request(options, function (error, response) {
    if (error) throw new Error(error);
    let lolBigObj = JSON.parse(response.body);
    lolBigObj
    console.log("ping!");
  })}, 15000);
