const nodemailer = require("nodemailer");
const User = require("../models/user");
const pass = process.env.EMAILPASS;
const emailRouter = require("express").Router();

const transporter = nodemailer.createTransport({
  maxConnections: 3,
  service: "hotmail",
  auth: {
    user: "nordicexchange@outlook.com",
    pass: pass,
  },
});

emailRouter.post("/seller", async (req, res) => {
  const { email, sellerEmail, items } = req.body;

  const buyer = await User.findOne({ email: email });

  console.log("buyer", buyer);
  console.log("sellerEmail", sellerEmail);

  const itemsPurchased = items
    .map(
      (cartItem) => `
      <li key=${cartItem.id}>
        <strong>${cartItem.name}</strong> - ${cartItem.price} ${cartItem.currency}
      </li>
    `
    )
    .join("");

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
    from: "nordicexchange@outlook.com",
    to: sellerEmail,
    subject: "New Purchase Notification",
    html: `
    <p>Hello,</p>
    <p>
      You have a new purchase! The following items have been sold:
      <ul>
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
  `,
  };

  // Send the email to the seller using your email sending logic
  transporter.sendMail(emailToSeller, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Sent Seller: " + info.response);
  });
  res.status(200).json({ message: "Email sent" });
});

emailRouter.post("/buyer", async (req, res) => {
  const { email, sellerEmail, items } = req.body;

  console.log("items", items);

  console.log("email", email);

  const itemHTML = items
    .map(
      (cartItem) => `
    <div key=${cartItem.id} id="Cartlisting" border: 1px solid #ccc; margin: 10px; padding: 10px; border-radius: 10px;">
      <div>
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=600:*"
          alt=${cartItem.name}
          style="
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
            border-radius: 10px;
          "
        />
      </div>
      <div>
        <div style="margin: 5px; font-weight: bold;">Name: ${cartItem.name}</div>
        <div style="margin: 5px;">Country: ${cartItem.country}</div>
        <div style="margin: 5px;">
          Price: ${cartItem.price} ${cartItem.currency}
        </div>
        <div style="margin: 5px;">
          Description: ${cartItem.description}
        </div>
      </div>
    </div>
  `
    )
    .join("");
  // Join the array of HTML strings into a single string

  const options = {
    from: "nordicexchange@outlook.com",
    to: email,
    subject: "Purchase Receipt",
    html: `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
      <h2 style="text-align: center; color: #333;">Thank you for your purchase!</h2>
      <div style="display: flex; justify-content: center; align-items: center; margin 5px;">
        ${itemHTML}
      </div>
      <p style="text-align: center; margin-top: 20px; font-size: 16px; color: #555;">
        If you have any questions or concerns, please contact us at nordicexchange@outlook.com or the seller ${sellerEmail}.
      </p>
    </div>
  `,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Sent Buyer: " + info.response);
  });
  res.status(200).json({ message: "Email sent" });
});

emailRouter.post("/contact", async (req, res) => {
  const { email, name, message } = req.body;

  const options = {
    from: "nordicexchange@outlook.com",
    to: "nordicexchange@outlook.com",
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Sent: " + info.response);
  });
  res.status(200).json({ message: "Email sent" });
});

module.exports = { transporter, emailRouter };
