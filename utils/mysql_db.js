const setting = require("./setting");
const mysql = require('mysql');

// 참고 : https://nesoy.github.io/articles/2017-04/Nodejs-MySQL
exports.pool = mysql.createPool({
    host     : setting.db.host,
    user     : setting.db.user,
    password : setting.db.password,
    database : setting.db.database,
    connectionLimit : setting.db.connectionLimit
});


// const connection = mysql.createConnection({
//     host     : setting.db.host,
//     user     : setting.db.user,
//     password : setting.db.password,
//     database : setting.db.database
// });


// connection.connect(function(err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }

//     console.log('db connected as id ' + connection.threadId);
// });


// module.exports = connection;
// exports.connection = connection;

// connection.end(function(err) {
//     if (err) {
//         console.error('error endding: ' + err.stack);
//         return;
//     }

//     console.log('db connected end as id ' + connection.threadId);
// });