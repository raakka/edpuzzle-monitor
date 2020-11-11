var request = require('request');
require('dotenv').config();

// I could not care less that this code is absolute garbage rn
// I needed a quick fix, maybe clean this up later idk

var options = {
  'method': 'GET',
  'url': process.env.ENDPOINT,
  'headers': {
    'Cookie': process.env.COOKIE
  }
};

let whurls = [];
whurls = process.env.WEBHOOK;

let current_assignments = [];
let prev_assignments = [];
let newassign = [];

function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}

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

    for (var i = 0, len = lolBigObj.teacherAssignments.length; i < len; ++i) {
      current_assignments.push(lolBigObj.teacherAssignments[i].id);
    }

    newassign = arr_diff(current_assignments, prev_assignments);
    prev_assignments.concat(newassign);
    newassign.forEach((id, i) => {
      let msg = {
  "embeds": [
    {
      "title": "New Edpuzzle",
      "fields": [
        {
          "name": "Assignment Id:",
          "value": id
        },
        {
          "name": "Due Date:",
          "value": "null"
        }
      ],
      "footer": {
        "text": "Powered by XVI#0016"
      }
    }
  ]
}
      post2webhook(msg);
    });


    console.log("ping!");
  })}, 15000);
