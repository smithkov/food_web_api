const nodemailer = require("nodemailer");
const options = (recipient, name, shopName)=>{
  return {
    from: `Foodengo<applications@foodengo.co.uk>`,
    sender: "info@foodengo.co.uk",
    to: recipient,
    subject: "Application Update",
    html: `<img style='height:50px, width:200px' src='cid:foodengo'/>
    <hr/>
    <h2>Application Received Successfully </h2><br/>
    <p><strong>Hi ${name},</strong></p>
    <p>Thank you for your application regarding listing ${shopName} on Foodengo, our team will review it and get back to you in 2 working days. </p>
    <p>Please kindly login with the link below to upload your proof of ownership such as international passport or national ID card.</p>
    <a href="https://foodengo.co.uk/login">Upload your proof ownership</a>
    `,
    attachments: [
      {
        filename: "logo.png",
        path: "./uploads/images/logo.png",
        cid: "foodengo",
      },
    ],
  };
}
const send= function(option){
  
  const transporter = nodemailer.createTransport({
    host: `mail.foodengo.co.uk`,
    port: 2525,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: `info@foodengo.co.uk`,
      pass: `2000years@BC`,
    },
  });
  const send = transporter.sendMail(option, (error, info) => {
    if (error) return null;
    else return info;
  });
};

module.exports = {
options: options,
send: send

}

