const nodemailer = require("nodemailer");
const express = require('express');

module.exports = function(app) {
    //함수로 만들어 객체 app을 전달받음	
	var router = express.Router();
    
    //확인하는 것은 check
    router.post('/check/mail', function(req, res) {
        res.send('Hello /p1/r1');
    });
    
    router.post('/check/maile/return', function(req, res) {
		res.send('Hello /p1/r1');	
	});

	router.post('/check/id', function(req, res) {
		res.send('Hello /p1/r2');		
    });

    router.post('/login', function(req, res) {
		res.send('Hello /p1/r2');		
    });

    router.post('/change/password', function(req, res) {
		res.send('Hello /p1/r2');		
    });
    
    /* 그외에 사용자 정보 변경 */
    router.post('/change/', function(req, res) {
		res.send('Hello /p1/r2');		
    });
    
	return router;	//라우터를 리턴
};



