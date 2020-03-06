// setting.json 의 내용을 읽어서 편하게 가져다 쓸 수 있게 한다.
const fs = require("fs");

const rawdata = fs.readFileSync('setting.json');
const student = JSON.parse(rawdata);

exports.port = student.port
exports.mail = student.mail
exports.db = student.db
