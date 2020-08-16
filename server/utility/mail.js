const nodemailer = require("nodemailer");
const localhost = "http://localhost:3000";
const productionUrl = "https://foodengo.co.uk/"
const options = (recipient, name, shopName)=>{
  return {
    from: "Foodengo<info@foodengo.co.uk>",
    sender: "info@foodengo.co.uk",
    to: recipient,
    subject: "Thank you for you application",
    html: `<img style='height:50px, width:200px' src='cid:foodengo'/>
    <hr/>
    
    <p><strong>Hello ${shopName},</strong></p>
    <p>Congratulations on registering on Foodengo.
    List your  menu and food photos first to start selling.
    Start selling(Link to selling dashboard)
    Selling on Foodengo only takes  3 simple steps:</p>
    
    <ul>
    <li>List your food menu and sample photos of foods on your menu.</li>
    <li>Go to store settings and set your selling options such as minimum spend, discount, delivery price, etc.</li>
    <li>Enter your bank details when you login to your dashboard under "Bank Details"</li>
    </ul>
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
    from: "Foodengo<hello@foodengo.co.uk>",
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
    from: "Enquiry<enquiry@foodengo.co.uk>",
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
    host: "mail.foodengo.co.uk",
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

