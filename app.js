(function() {
  var app, client, express, http, options, response, responseCallback;
  express = require("express");
  app = express.createServer();
  http = require("http");
  app.configure(function() {
    return app.use(express.static(__dirname + '/public'));
  });
  options = {
    host: "laftraf.laughinglarkllc.com",
    port: 80,
    path: "/cameras.json"
  };
  response = "";
  responseCallback = function(res) {
    return res.on('data', function(chunk) {
      return response += chunk;
    });
  };
  client = http.request(options, responseCallback);
  client.end();
  app.get('/', function(req, res) {
    return res.sendfile(__dirname + '/public/index.html');
  });
  app.get('/cameras', function(req, res) {
    res.header('Content-Type', 'application/json');
    return res.send(response);
  });
  app.listen(3000);
}).call(this);
