var express = require("express");
var http = require("http");

var app = express();
app.use(express.logger());
app.use(express.bodyParser());

app.post('/bot_callback', function(request, response) {
  console.log("request:" + request.body.text);
  var command = request.body.text.match(/\?([a-z]+)/gi);
  if (command) {
   handle_command(command[0]);
  }
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


function handle_command(cmd) {

  switch (cmd) {
    case "ping":
      send_to_chat("pong");
      break;
    default:
      break;
  }
}

function send_to_chat(message) {

  var post_data = JSON.stringify({
    bot_id: process.env.GROUPME_BOT_ID,
    text: message
  });
  var options = {
    hostname: 'api.groupme.com',
    port: 443,
    path: '/v3/bots/post',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length
    }
  };
  // Set up the request
  var post_req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
}

