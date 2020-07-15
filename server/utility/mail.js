const nodemailer = require("nodemailer");

module.exports.send= (recipient, name, shopName)=> {
  let mailOptions = {
    from: `Foodengo<applications@foodengo.co.uk>`,
    sender: "applications@foodengo.co.uk",
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

  let transporter = nodemailer.createTransport({
    host: `mail.foodengo.co.uk`,
    port: 2525,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: `applications@foodengo.co.uk`,
      pass: `2000years@BC`,
    },
  });
  transporter.sendMail(mailOptions, (error, info) => {
      //console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", info)
    if (error) return null;
    else return info;
  });
};
