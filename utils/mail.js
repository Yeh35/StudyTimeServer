const nodemailer = require("nodemailer");
const setting = require("./setting");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: setting.mail.user,  // gmail 계정 아이디를 입력
      pass: setting.mail.pass   // gmail 계정의 비밀번호를 입력
    }
});

//  let mailOptions = {
//     from: setting.mail.user,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
//     to: "" ,                     // 수신 메일 주소
//     subject: 'Sending Email using Node.js',   // 제목
//     text: 'That was easy!'  // 내용
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     }
//     else {
//       console.log('Email sent: ' + info.response);
//     }
//   }); 

exports.sendMail = function(mailOptions, callback) {
    transporter.sendMail(mailOptions, callback);
} 