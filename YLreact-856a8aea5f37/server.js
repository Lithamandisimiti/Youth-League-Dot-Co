/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();

const server = http.createServer(app);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('*.js', function(req, res, next) {
  res.setHeader('Content-Type', 'text/javascript');
  next();
});

app.use(express.static(path.join(__dirname, 'build')));

// send all requests to index.html so browserHistory in React Router works
app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

/* Start server */
server.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
});

module.exports = app;
