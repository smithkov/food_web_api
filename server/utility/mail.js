const nodemailer = require("nodemailer");
const localhost = "http://localhost:3000";
const productionUrl = "https://foodengo.co.uk/"
const options = (recipient, name, shopName)=>{
  return {
    from: `Foodengo<info@foodengo.co.uk>`,
    sender: "info@foodengo.co.uk",
    to: recipient,
    subject: "Application Status",
    html: `<img style='height:50px, width:200px' src='cid:foodengo'/>
    <hr/>
    <h2>Application Received Successfully. </h2><br/>
    <p><strong>Hi ${name},</strong></p>
    <p>Thank you for your application regarding listing ${shopName} on Foodengo, our team will review it and get back to you in 2 working days. </p>
    <p>Please kindly login with the link below to upload your proof of ownership such as international passport or national ID card.</p>
    <a href="${productionUrl}login">Upload your proof ownership</a>
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
const activateOptions = (recipient, code)=>{
  return {
    from: `Foodengo<hello@foodengo.co.uk>`,
    sender: "hello@foodengo.co.uk",
    to: recipient,
    subject: "Foodengo Account Activation",
    html: `<img style='height:50px, width:200px' src='cid:foodengo'/>
    <hr/>
    <h2>Hello, you’re a click away</h2><br/>
    <p>We've sent you this email because you requested to start selling on Foodengo. In order to complete the set up, we need to activate your account.</p>
    <p>To activate your account either,</p>
    <p>1) Click the link below and follow the on-screen instructions.</p>
    <a href="${productionUrl}account_verification/${code}">${productionUrl}account_verification/${code}</a>
    <p>2) If you have the Foodengo site already open in a browser, you can enter ${code} into the activation code page.</p>
    <p>Yours sincerely, </p>
    <p>Foodengo</p>
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
const contactOptions = (email, reason, message, fullname)=>{
  return {
    from: `Enquiry<enquiry@foodengo.co.uk>`,
    sender: "enquiry@foodengo.co.uk",
    to: "info@foodengo.co.uk",
    subject: reason,
    html: `<img style='height:50px, width:200px' src='cid:foodengo'/>
    <hr/>
    <p>Name: ${fullname} </p>
    <p>Email: ${email} </p>
    <p>Reason: ${reason} </p>
    <p>${message}</p>
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
      user: option.sender,
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
send: send,
activateOption: activateOptions,
contactOptions

}

