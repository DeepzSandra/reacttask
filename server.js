'use strict';

var express = require('express');

const async = require('async');

var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    path = require('path'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
   
    expressSession = require('express-session'),
    config = require('./config'),
    compress = require('compression'),
   
    connection = require('./connection');

  
   
    var request = require('request');
    
    var macaddress = require('macaddress');
server.listen(8081);
global.connectionList = {};
const { exec } = require('pkg')

app.use(express.static(path.join(__dirname, 'public')));
const net = require('net');
const MongoClient= require('mongodb').MongoClient;
const PORT = 8091;
const ADDRESS = '127.0.0.1';
const url = 'mongodb://localhost:27017/ipmonitor';

const fs = require('fs');

var usernames = {};


//Security related information
app.use(helmet());
var ninetyDaysInSeconds = 7776000
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: config.hpkp,
  includeSubDomains: true,
  setIf: function (req, res) {
    return req.secure
  }
}))

app.set('trust proxy', 1);
app.use(compress());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));
app.post('/listfullcontact',function (req,res){
  //  console.log(req,"0000000000000090")
  var frmRes = req.body;
  fs.readFile('data.json', function (err, data){
    var resData = JSON.parse(data);
    var test = [];
    for(var i=0;i<resData.length;i++){
            test.push(resData[i]);

    }
    res.end(JSON.stringify(test));
    
  })
})

app.post('/listcontact',function (req,res){
  //  console.log(req,"0000000000000090")
  var frmRes = req.body;
  fs.readFile('data.json', function (err, data){
    var resData = JSON.parse(data);
    var test = [];
    for(var i=0;i<resData.length;i++){
        if(resData[i].id != frmRes.username){
            test.push(resData[i]);

        }
    }
    res.end(JSON.stringify(test));
    
  })
})
app.post('/getcontact',function (req,res){
  //  console.log(req,"0000000000000090")
  var frmRes = req.body;
  fs.readFile('data.json', function (err, data){
    var resData = JSON.parse(data);
    var test = [];
    for(var i=0;i<resData.length;i++){
        if(resData[i].id == frmRes.id){
            test.push(resData[i]);

        }
    }
    res.end(JSON.stringify(test[0]));
    
  })
})
// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))
//Passport initialization
app.use(expressSession({
    secret: '6*IwLS$%FYktth>7!&3}&AoJ}gOb',
    saveUninitialized: true,
    resave: true,
    cookie: {httpOnly: true}
}));

app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'socket.html'));
});
app.get('/logout', function(req, res) {
    delete req.user;
    req.logout();
    res.end(JSON.stringify({"status": true}));
});
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});


app.post('/addcontact', function (req, res) {

  async.waterfall([
    function(callback) {
      fs.access("data.json", fs.F_OK, (err) => {
      callback(err, true);
    })
    },
    function(data, callback) {

      if(data) {
        fs.readFile('data.json', 'utf8', function (err,resData) {
        if (err) {
          callback(err, resData);
          return;
        }
        //console.log(resData);
        callback(null, resData);
      });
      } else {
         callback(data, null);
      }
    },
    function(data, callback) {
      var parseResult;
      if(data != "") {
        console.log("i am here", data)
        parseResult = JSON.parse(data);
        parseResult.push(req.body);
      } else {
        console.log("i am here else", data);
        parseResult = [req.body];
      }

      fs.writeFile('data.json', JSON.stringify(parseResult), function (err) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, data);
    });
    }
  ], function(err, result) {
      if(err) {
        res.end(JSON.stringify({msg: "Failed to add contact", status: 0}));
      } else {
        res.end(JSON.stringify({msg: "Contact added successfully", status: 1}));
      }
  });
});

io.on('connection', function (socket) {
    var id = Math.floor(Math.random() * new Date().getTime());
    console.log("Client New Id test:" + id);
    socket.id = id;
    global.connectionList[id] = socket;

    socket.on("error", function(error) {
        console.log("Socket Error" + error);
    });
 
    socket.on('disconnect', function(){
        console.log( '  disconnected from the chat.', GLOBAL.connectionList[socket.id]["userres"]);
        for(var i in global.connectionList) {
            var cond = {};
            cond["status.id"] = 1;
        }
        delete GLOBAL.connectionList[socket.id];

    });
    socket.on('close', function() {
        console.log('Client Closed Id:' + socket.id);
        delete GLOBAL.connectionList[socket.id];
    });

   socket.on('message', function(data) {
        var cldata = data;
        var req = {};
        req.body = cldata;
        req.socket = socket;
        req.connectionList = connectionList;
        console.log(data, "ddddd");
        switch (cldata.fname) {
            case "login":
                userLogin(req);
            break;
            case "sendMessage":
                sendMessage(req);
            break;
        }
    });
});

function userLogin(req) {
  req.socket.username = req.body.username;
	usernames[req.body.username] = {socketId: req.socket.id, socketObj: req.socket, chatName: req.body.chatName};
}
function sendMessage(req) {
  //io.sockets.socket(usernames[req.body.result.username]).emit();
  //io.to(usernames[req.body.result.username]).emit('message', 'for your eyes only');
  //io.sockets.connected[usernames[req.body.result.username]].emit('receiveMessage', req.body.result);
  req.body.result.chatName = usernames[req.body.result.username]["chatName"];
  usernames[req.body.result.username]["socketObj"].emit('receiveMessage', req.body.result);
}
