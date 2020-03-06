const express = require('express');
const crypto = require('crypto');

const setting = require("../utils/setting");
const mail = require("../utils/mail");
const db = require("../utils/mysql_db");
const random = require("../utils/random");

module.exports = function(app) {
    //함수로 만들어 객체 app을 전달받음	
	var router = express.Router();
    
    //확인하는 것은 check

    /** */
    router.post('/check/email/send', function(req, res) {

        let email = req.body.email;
        let token = random.randomString(10);

        let mailOptions = {
            // from: "jaws0910@gmail.com",    // 발송 메일 주소
            to: email,            // 수신 메일 주소
            subject: '일름보 안녕하세요, 이메일 인증해주세요',   // 제목
            html: "<p>아래의 링크를 클릭해주세요 !</p>" +  // 내용
                  `<a href='http://localhost:${setting.port}/users/check/maile/auth/?email=${email}&token=${token}'>인증하기</a>`
          };
        
        db.pool.getConnection(function(err, connection) {
            
            if (err) {
                console.error(err);
                res.send("Email sent Error");
            }
            
            var sql = `SELECT auth FROM email_check WHERE email = '${email}'`
            connection.query(sql, function (error, results, fields) {
                if (error) {
                    console.error(error);
                };

                let send_time = Date.now();

                if ( !results[0] ) {
                    sql = `INSERT INTO email_check(email, auth, send_time) values('${email}', '${token}', ${send_time})`;
                } else {
                    if (results[0].auth == "Y") {
                        let return_val = {ERROR : 2, MSG : "This email has been verified"};
                        res.send(JSON.stringify(return_val));    
                        return;
                    }
                    
                    sql = `UPDATE FROM email_check SET send_time = ${send_Time} WHERE email = ${email}`;
                }

                connection.query(sql, function(err, result) {
                    if (err) {
                        throw err;
                    }
                    
                    mail.sendMail(mailOptions, function(error, info) {
                        if (error) {
                          console.error(error);
                          res.send("Email sent Error");
                        }
                        else {
                          console.log('Email sent: ' + info.response);
                          res.send("Email sent finish");
                        }
                    });

                    db.connection.end();
                });
            });
        });
    });
    
    router.post('/check/email/auth', function(req, res) {
        let _email = req.email;
        let _token = req.token;

        db.pool.getConnection(function(err, connection) {
            if (err) {
                throw err;
            }       
            
            var sql = `SELECT auth, send_time FROM email_check WHERE email = ${email}`;
            connection.query(sql, function(err, result, fileds) {
                if (err) {
                    throw err;
                }
                
                result[0].auth

            });
        });

        if (_token != token) {
            let return_val = {ERROR : 1, MSG : "Wrong token"};
            res.send(JSON.stringify(return_val));    
            return;
        }
	});

	router.get('/check/email', function(req, res) {
        let email = req.query.email;

        db.pool.getConnection(function(err, connection) {
            var sql = `SELECT count(*) as cnt FROM email_check WHERE email = '${email}' AND auth = 'Y';`;

            connection.query(sql, function(err, results, fileds) {
                if (err) {
                    throw err;
                }

                var sendData;
                if (results[0].cnt >= 1) {
                    sendData = {result : 1, msg : "This email is already subscribed."};
                } else {
                    sendData = {result : 0, msg : "This email is available."};
                }
            
                res.send(JSON.stringify(sendData));

                connection.release(); //커넥션을 풀에 반환
            });
        });
    });

    router.post('/insert', function(req, res) {
        
        let email = req.body.email;
        let salt = random.randomString(64);
        let password = crypto.createHash('sha512').update(req.body.password).digest('base64');

        db.pool.getConnection(function(err, connection) {

            var sql = `SELECT count(*) as cnt FROM email_check WHERE email = '${email}' AND auth = 'Y';`;
            connection.query(sql, function(err, results, fileds) {
                if (err) {
                    throw err;
                }
                
                if (results[0].cnt < 1) {
                    connection.release(); //커넥션을 풀에 반환
                    
                    var sendData = {result : 1, msg : "This email is not auth."};
                    res.send(JSON.stringify(sendData));
                } else {
                    sql = `INSERT INTO users(num, email, password, salt) values(,'${email}', '${password}', '${salt}');`
                    connection.query(sql, function(err, result, fileds) {
                        if (err) {
                            throw err;
                        }

                        connection.release(); //커넥션을 풀에 반환

                        var sendData = {result : 0, msg : "Hello world"};
                        res.send(JSON.stringify(sendData));
                    });
                }
            });
        });
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



