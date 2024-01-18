const nodemailer = require('nodemailer');
const User = require('../models/user');
const pass = process.env.EMAILPASS;
const jwt = require('jsonwebtoken');
const emailRouter = require('express').Router();

const transporter = nodemailer.createTransport({
  maxConnections: 3,
  service: 'hotmail',
  auth: {
    user: 'nordicexchange@outlook.com',
    pass: pass,
  },
});

emailRouter.post('/seller', async (req, res) => {
  const {email, sellerEmail, items} = req.body;

  const buyer = await User.findOne({email: email});

  console.log('buyer', buyer);
  console.log('sellerEmail', sellerEmail);

  const itemsPurchased = items
    .map(
      (cartItem) => `
      <li key=${cartItem.id}>
        <strong>${cartItem.name}</strong> - ${cartItem.price} ${cartItem.currency}
      </li>
    `
    )
    .join('');

  const totalAmount = items.reduce(
    (total, cartItem) => total + cartItem.price,
    0
  );

  const buyerInfo = `
  <p>
    <strong>Buyer Information:</strong><br />
    Email: ${email}, Phone: ${buyer.phone}
    address: ${buyer.address}
    city: ${buyer.city}
    country: ${buyer.country}
    postalCode: ${buyer.postalCode}
  </p>
`;

  const emailToSeller = {
    from: 'nordicexchange@outlook.com',
    to: sellerEmail,
    subject: 'New Purchase Notification 🛍️',
    html: `
<div style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 5px; background-color: #336699; background-image: linear-gradient(90deg, #336699 0%, #66a3cc 100%); color: #fdfcfd;">
  <p>Hello,</p>

  <p>
    Great news! You have a new purchase. The following items have been sold:
    <ul style="color: #fdfcfd; margin: 10px 0;">
      ${itemsPurchased}
    </ul>
    <strong>Total Amount:</strong> ${totalAmount} ${items[0].currency}
  </p>

  ${buyerInfo}

  <p>
    Please ship the items to the buyer's address as soon as possible. If you have any questions or concerns, feel free to contact the buyer at ${email}.
  </p>

  <p>Thank you for your prompt attention to this matter.</p>

  <p>Best regards,<br />Nordic Exchange Team</p>
</div>
`,
  };

  // Send the email to the seller using your email sending logic
  transporter.sendMail(emailToSeller, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Sent Seller: ' + info.response);
  });
  res.status(200).json({message: 'Email sent'});
});

emailRouter.post('/buyer', async (req, res) => {
  const {email, sellerEmail, items} = req.body;

  console.log('items', items);

  console.log('email', email);

  function base64ToImage(base64Data, altText = 'Image') {
    return `<img
    src={base64Data}
    alt="${altText}"
    style="max-width: 100px; max-height: 100px; object-fit: cover; border-radius: 10px;"
  />`;
  }

  const itemHTML = items
    .map(
      (cartItem) => `
    <div key="${
      cartItem.id
    }" style="border: 1px solid #ccc; margin: 10px; padding: 10px; border-radius: 10px; background-color: #fff;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        ${base64ToImage(cartItem.pics)}
        <div style="flex-grow: 1; padding: 0 10px;">
          <div style="font-weight: bold;">Name: ${cartItem.name}</div>
          <div>Country: ${cartItem.country}</div>
          <div>Price: ${cartItem.price} ${cartItem.currency}</div>
          <div>Description: ${cartItem.description}</div>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  // Now you can use `itemHTML` as needed.

  const options = {
    from: 'nordicexchange@outlook.com',
    to: email,
    subject: 'Purchase Receipt',
    html: `
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border: 1px solid #ccc; border-radius: 10px;">
    <h2 style="text-align: center; color: #336699;">Thank you for your purchase!</h2>
    <div style="margin-top: 20px;">
      ${itemHTML}
    </div>
    <p style="text-align: center; margin-top: 20px; font-size: 16px; color: #555;">
      If you have any questions or concerns, please contact us at <a href="mailto:nordicexchange@outlook.com" style="color: #336699; text-decoration: none;">nordicexchange@outlook.com</a> or the seller at <a href="mailto:${sellerEmail}" style="color: #336699; text-decoration: none;">${sellerEmail}</a>.
    </p>
  </div>
`,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Sent Buyer: ' + info.response);
  });
  res.status(200).json({message: 'Email sent'});
});

emailRouter.post('/contact', async (req, res) => {
  const {email, name, message} = req.body;

  const options = {
    from: 'nordicexchange@outlook.com',
    to: 'nordicexchange@outlook.com',
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Sent: ' + info.response);
  });
  res.status(200).json({message: 'Email sent'});
});

emailRouter.post('/reset', async (req, res) => {
  const {email} = req.body;
  const token = jwt.sign({email}, process.env.SECRET, {
    expiresIn: 15 * 60,
  });
  console.log('token', token);
  const url = `http://localhost:5173/reset-password/${email}?token=${token}`;
  const options = {
    from: 'nordicexchange@outlook.com',
    to: email,
    subject: 'Reset Password',
    html: `
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border: 1px solid #ccc; border-radius: 10px;">
    <h2 style="text-align: center; color: #336699;">Reset Password</h2>
    <p style="text-align: center; margin-top: 20px; font-size: 16px; color: #555;">
      Please click the link below to reset your password.
    </p>
    <p style="text-align: center; margin-top: 20px; font-size: 16px; color: #555;">
      <a href="${url}" style="color: #336699; text-decoration: none;">Reset Password</a>
    </p>
  </div>
`,
  };
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Sent Buyer: ' + info.response);
  });
  res.status(200).json({message: 'Email sent'});
});

emailRouter.post('/reset-password/', async (req, res) => {
  const query = req.query;
  const email = query.email.split('?token=')[0];
  const token = `${query.email.split('?token=')[1]}`;
  console.log('email', email);
  console.log('token', token);

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      console.log('Invalid token');
      res.status(400).send('Invalid or expired reset password link');
      return;
    }
    // Token is valid, allow the user to reset the password
    res.status(200).send('Valid reset password link');
  } catch (error) {
    console.log('Invalid token');
    res.status(400).send('Invalid or expired reset password link');
  }
});

emailRouter.post('/password', async (req, res) => {
  const {email} = req.body;
  const options = {
    from: 'nordicexchange@outlook.com',
    to: email,
    subject: 'Password Changed Notification',
    html: `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border: 1px solid #ccc; border-radius: 10px; font-family: Arial, sans-serif;">

      <h2 style="text-align: center; color: #333; margin-bottom: 20px;">Password Changed Notification</h2>

      <p style="font-size: 16px; color: #555; text-align: center; margin-top: 20px;">
        Dear User,
      </p>

      <p style="font-size: 16px; color: #555; text-align: center;">
        We wanted to inform you that your password has been successfully changed.
      </p>

      <p style="font-size: 16px; color: #555; text-align: center;">
        If you did not initiate this change or have any concerns about the security of your account, please contact us immediately at
        <a href="mailto:nordicexchange@outlook.com" style="color: #007BFF; text-decoration: none; font-weight: bold;">nordicexchange@outlook.com</a>.
      </p>

      <p style="font-size: 16px; color: #555; text-align: center; margin-top: 20px;">
        Thank you for choosing Nordic Exchange.
      </p>

    </div>
  `,
  };
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Sent Buyer: ' + info.response);
  });
  res.status(200).json({message: 'Email sent'});
});

module.exports = {transporter, emailRouter};
