const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const router = require('./router/router');

// db
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:auth/auth') ;

// app
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

// server
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, function(err){
  if(err){
    console.log('error in server: ', err);
  }
  else {
    console.log('app listening on port: ', port);
  }
});
