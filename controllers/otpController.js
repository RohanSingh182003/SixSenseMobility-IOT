const nodemailer = require('nodemailer');

const otpController = (req,res)=> {
    
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rs7289579@gmail.com',
      pass: 'nzrmnefocszzjbbx'
    }
  });
  
  const mailOptions = {
    from: 'rs7289579@gmail.com',
    to: req.body.email,
    subject: 'OTP Varification',
    text: 'Your OTP for SixSenseMobility IOT is :'+ JSON.stringify(req.body.otp)
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(error);
    } else {
      res.send('Email sent: ' + info.response);
    }
  });
}

module.exports = otpController