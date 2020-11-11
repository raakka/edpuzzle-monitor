var request = require('request');
require('dotenv').config();
const fetch = require('node-fetch');

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
whurls.push(process.env.WEBHOOK);

let current_assignments = [];
let prev_assignments = [];
let newassign = [];

function post2webhook(jsonmsg) {
  whurls.forEach((whurl, i) => {
    fetch(whurl + "?wait=true",
    {"method":"POST",
    "headers": {"content-type": "application/json"},
    "body": JSON.stringify(jsonmsg)})
    .then(console.log("sent webhook"))
  });
}

setInterval(function(){
  request(options, function (error, response) {
    if (error) throw new Error(error);

    let lolBigObj = JSON.parse(response.body);

    for (var i = 0, len = lolBigObj.teacherAssignments.length; i < len; ++i) {
      current_assignments.push(JSON.stringify(lolBigObj.teacherAssignments[i]._id)
    +" *Due Date:* "+JSON.stringify(lolBigObj.teacherAssignments[i].preferences.dueDate));
    }

    let difference = current_assignments
                  .filter(x => !prev_assignments.includes(x))
                  .concat(prev_assignments
                  .filter(x => !current_assignments.includes(x)));
    prev_assignments=prev_assignments.concat(difference);
    difference.forEach((id, i) => {
      let msg = {
  "embeds": [
    {
      "title": "New Edpuzzle",
      "fields": [
        {
          "name": "Assignment",
          "value": id
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

    //console.log(prev_assignments);
    current_assignments=[];
  })}, 3000);
