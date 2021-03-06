const express = require('express');
const bodyParser = require('body-parser')

const setting = require("./utils/setting");

const app = express();

//cnfig bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(express.json());

//라우터 설정
const users = require('./router/users.js');
app.use("/users", users(app));

const server = app.listen(setting.port, function() {
    //서버 시작하면 해야할 작업들..
    console.log('Start listening to server');
    console.log('Url : localhost:4000');
});

//서버 종료시 처리해야하는 것들.
server.on('close', function() {
    console.log('Close listening to server');
});

// 프로세스 종료시 처리를 어떻게 해야하지..
process.on('SIGINT', function() {
    console.log('process event callback [SIGINT]');
    server.close();
});

process.on('SIGTERM', function() {
    console.log('process event callback [SIGTERM]');
    server.close();
});

process.on('exit', function() {
    server.close();
    console.log('process event callback [exit]');
});


