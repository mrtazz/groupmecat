var express = require("express");
var http = require("https");

var app = express();
app.use(express.logger());
app.use(express.bodyParser());

var last_posted = (new Date).getTime();

app.post('/bot_callback', function(request, response) {
  var command = request.body.text.match(/\?([a-z]+)/gi);
  if (command) {
   handle_command(command[0], send_to_chat);
  }
  response.send('handled');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


function handle_command(cmd, send_callback) {

  switch (cmd) {
    case "?ping":
      send_callback("pong");
      break;
    default:
      console.log("Nothing to do for: " + cmd);
      break;
  }
}

function send_to_chat(message) {

  var now = (new Date).getTime();
  var diff = now - last_posted;
  console.log("Time since last posted: "+diff);

  if (diff < process.env.POST_THROTTLE) {
    console.log("Not sending message due to throttling");
    last_posted = now
    return
  }

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

