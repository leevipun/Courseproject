const bcrypt = require('bcrypt');
const User = require('../models/user');
const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');
const List = require('../models/list');
const API_KEY = process.env.SECRET_STRIPE;
const stripe = require('stripe')(API_KEY);
require('express-async-errors');
const nodemailer = require('nodemailer');
const {transporter} = require('./email');
const pass = process.env.EMAILPASS;
const Chat = require('../models/chat');
const Message = require('../models/message');

const extractToken = middleware.extractToken;

usersRouter.post('/', async (req, res) => {
  const {newObject} = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newObject.password, saltRounds);

  console.log(req.ip);

  const user = new User({
    email: newObject.email,
    firstname: newObject.firstName,
    lastname: newObject.lastName,
    passwordHash: passwordHash,
    country: newObject.country,
    style: newObject.style,
    id: newObject.id,
    city: newObject.city,
    address: newObject.address,
    postalCode: newObject.postalCode,
    phone: newObject.phone,
    iban: newObject.iban,
    Dob: newObject.Dob,
  });
  console.log(user);

  const savedUser = await user.save();

  res.status(201).json(savedUser);

  const options = {
    from: 'nordicexchange@outlook.com',
    to: newObject.email,
    subject: '🌟 Welcome to Nordic Exchange! 🌟',
    html: `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #336699; border-radius: 10px; background-color: #1a1a1a; color: #fdfcfd; font-family: 'Arial', sans-serif;">
      <h2 style="text-align: center; color: #66a3cc; margin-bottom: 20px;">Welcome to Nordic Exchange!</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #fdfcfd;">
        <strong>🎉 Thank you for joining Nordic Exchange</strong> and becoming an esteemed member of our vibrant community. We're delighted to have you with us!
      </p>
      <div style="margin-top: 20px; padding: 20px; border: 1px solid #336699; border-radius: 10px; background-color: #66a3cc; color: #fff;">

        <h2 style="text-align: center; color: #fff; margin-bottom: 20px;">About Nordic Exchange</h2>
        <p style="font-size: 18px; line-height: 1.6; color: #fff; margin-bottom: 15px;">
          Nordic Exchange is your gateway to a sustainable future! We are more than just a C2C marketplace; we are on a mission to revolutionize material usage and promote a greener, more sustainable world.
        </p>
        <p style="font-size: 18px; line-height: 1.6; color: #fff; margin-bottom: 15px;">
          At Nordic Exchange, we believe in the power of conscious consumerism. Our platform connects individuals and businesses in a unique C2C model, fostering a circular economy where materials are reused, recycled, and repurposed to reduce waste and environmental impact.
        </p>
        <p style="font-size: 18px; line-height: 1.6; color: #fff; margin-bottom: 15px;">
          What sets us apart is our unwavering commitment to sustainability. Every transaction on Nordic Exchange contributes to our vision of a world where resources are used responsibly, and waste is minimized.
        </p>
        <p style="font-size: 18px; line-height: 1.6; color: #fff; margin-bottom: 15px;">
          Join us in building a community that values not only the products exchanged but also the impact those transactions have on the environment.
        </p>
        <p style="font-size: 18px; line-height: 1.6; color: #fff; margin-bottom: 15px;">
          Nordic Exchange - Empowering Sustainable Material Usage, One Transaction at a Time.
        </p>
      </div>

      <p style="font-size: 16px; line-height: 1.6; color: #fdfcfd; text-align: center; margin-top: 20px;">
        Best regards,<br />
        Nordic Exchange Team
      </p>
    </div>
  `,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Sent: ' + info.response, 'to: ' + info.accepted);
  });
});

usersRouter.patch('/stripe', extractToken, async (req, res) => {
  try {
    const iban = req.body.iban;
    const email = req.body.email;

    console.log(req.body);

    const user = await User.findOne({email: email});
    console.log(user);
    console.log(user.email);
    console.log(user.country);
    console.log(user.Dob);
    console.log(user.phone);

    const splitBirthDate = user.Dob.split('/');
    console.log(splitBirthDate);
    const day = splitBirthDate[1];
    const month = splitBirthDate[0];
    const year = splitBirthDate[2];

    const stripeAccount = await stripe.accounts.create({
      type: 'custom',
      email: user.email,
      country: user.country,
      capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true},
      },
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: '82.181.90.127',
      },
      business_type: 'individual',
      business_profile: {
        mcc: '5734',
        product_description: 'Test',
      },
      external_account: {
        object: 'bank_account',
        country: user.country,
        currency: 'eur',
        account_holder_name: user.name && user.lastName,
        account_holder_type: 'individual',
        account_number: iban,
      },
      individual: {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone: user.phone,
        address: {
          city: req.body.city,
          country: req.body.country,
          line1: req.body.address,
          postal_code: req.body.postalCode,
        },
        dob: {
          day: day,
          month: month,
          year: year,
        },
      },
    });

    // Update the user with the stripeId
    await User.updateOne(
      {email: user.email},
      {$set: {stripeId: stripeAccount.id}}
    );

    return res
      .status(200)
      .json({message: 'Stripe account created successfully'});
  } catch (error) {
    console.error(error);
    await User.findOneAndDelete({email: req.body.email});
    return res.status(500).json({error: 'Adding stripeID failed'});
  }
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.get('/info', extractToken, async (req, res) => {
  const deCodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!deCodedToken.id) {
    return res.status(401).json({error: 'Invalid token'});
  }
  const user = await User.findOne({email: deCodedToken.email});
  res.json(user);
});

usersRouter.put('/', async (req, res) => {
  const body = req.body;
  try {
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).json({error: 'Invalid token'});
    }

    const user = await User.findOne({email: deCodedToken.email});

    if (!user) {
      return res.status(401).json({error: 'User not found'});
    }

    const item = {
      email: body.email,
      firstname: body.firstname,
      lastname: body.lastname,
      style: body.style,
      country: body.country,
      city: body.city,
      address: body.address,
      postalCode: body.postalCode,
      phone: body.phone,
      Dob: body.Dob,
      iban: body.iban,
    };

    console.log(user._id);
    const updatedUser = await User.findOneAndUpdate({_id: user._id}, item, {
      new: true,
      returnDocument: 'after',
    });

    // No need to explicitly call save when using findOneAndUpdate with returnDocument: 'after'
    console.log('Päivitetty', updatedUser);
    res.send('User updated successfully');
  } catch (error) {
    console.log('Tänne :(');
    console.error(error);
    return res.status(400).send({error: 'Error occurred while updating user'});
  }
});

usersRouter.put('/password', async (req, res) => {
  const body = req.body;
  try {
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).json({error: 'Invalid token'});
    }
    const user = await User.findOne({email: deCodedToken.email});
    console.log(user);
    const passwordCorrect = await bcrypt.compare(
      body.password,
      user.passwordHash
    );
    if (passwordCorrect) {
      return res.status(401).json({error: 'You can not use your old password'});
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const item = {
      passwordHash: passwordHash,
    };
    console.log(item);
    const updatedUser = await User.findByIdAndUpdate(user._id, item, {
      new: true,
    });
    console.log(updatedUser);
    await user.save();
    res.send('Password updated successfully');
  } catch (error) {
    console.log('Tänne :(');
    console.error(error);
    return res.status(400).send('Error occurred while updating user');
  }
});

usersRouter.delete('/', extractToken, async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    console.log(req.token);
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).json({error: 'Invalid token'});
    }
    const user = await User.findOne({email: deCodedToken.email});
    const userListings = user.listings;
    const userCart = user.cart;
    const userStripeId = user.stripeId;
    const chats = user.chats;
    console.log(userStripeId);
    console.log(userCart);
    console.log(user);
    console.log(userListings);
    for (const id of userListings) {
      console.log(id);
      await List.findByIdAndRemove(id);
    }

    const item = {
      status: 'Avialable',
    };
    if (userCart) {
      for (const id of userCart) {
        await List.findByIdAndUpdate(id, item, {new: true});
      }
    }
    if (chats) {
      for (const id of chats) {
        if (chats.messages) {
          for (const id of chats.messages) {
            await Message.findByIdAndRemove(id);
          }
        }
        await Chat.findByIdAndRemove(id);
      }
    }
    const deletedStripeAccount = await stripe.accounts.del(userStripeId);
    if (!deletedStripeAccount || deletedStripeAccount.deleted !== true) {
      return res.status(400).send('Error occurred while deleting account');
    } else {
      await User.findByIdAndRemove(user._id);
      const options = {
        from: 'nordicexchange@outlook.com',
        to: user.email,
        subject: 'Farewell Message from Nordic Exchange 😢',
        html: `
    <div style="
      font-family: 'Arial', sans-serif;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #336699;
      background-image: linear-gradient(90deg, #336699 0%, #66a3cc 100%);
      color: #fdfcfd;
    ">
      <h1>We're Sorry to See You Go!</h1>
      <p style="font-size: 16px; line-height: 1.6;">Dear ${user.firstname} ${user.lastname},</p>
      <p style="font-size: 16px; line-height: 1.6;">Thank you for being a part of the Nordic Exchange community. We hope you enjoyed your time with us.</p>
      <p style="font-size: 16px; line-height: 1.6;">Although you're leaving, your presence will be missed. We appreciate the trust you placed in us.</p>
      <p style="font-size: 16px; line-height: 1.6;">If you ever decide to return, we'll be here to welcome you back with open arms.</p>
      <p style="font-size: 16px; line-height: 1.6;">Best regards,</p>
      <p style="font-size: 16px; line-height: 1.6;">The Nordic Exchange Team</p>
    </div>
  `,
      };

      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Sent: ' + info.response, 'to: ' + info.accepted);
      });
      res.status(204).send('User deleted Successfully');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send('Error occurred while deleting user');
  }
});

usersRouter.delete('/admin/:id', async (req, res) => {
  console.log('Tultiin tänne');
  try {
    console.log('Tultiin tänne');
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).json({error: 'Invalid token'});
    }
    const user = await User.findOne({email: deCodedToken.email});
    if (user.style === 'admin') {
      const userToDelete = await User.findById(req.params.id);
      console.log(userToDelete);
      const userListings = userToDelete.listings;
      const userCart = userToDelete.cart;
      const chats = userToDelete.chats;
      for (const id of userListings) {
        console.log(id);
        await List.findByIdAndRemove(id);
      }

      const NewItem = {
        status: 'Avialable',
      };
      if (userCart) {
        for (const id of userCart) {
          await List.findByIdAndUpdate(id, NewItem, {new: true});
        }
      }
      if (chats) {
        for (const id of chats) {
          if (chats.messages) {
            for (const id of chats.messages) {
              await Message.findByIdAndRemove(id);
            }
          }
          await Chat.findByIdAndRemove(id);
        }
      }
      const deletedStripeAccount = await stripe.accounts.del(
        userToDelete.stripeId
      );
      if (!deletedStripeAccount || deletedStripeAccount.deleted !== true) {
        return res.status(400).send('Error occurred while deleting account');
      } else {
        await User.findByIdAndRemove(userToDelete._id);
        const restUsers = await User.find({});
        res.status(204).json(restUsers);
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send('Error occurred while deleting user');
  }
});

usersRouter.put('/:id', async (req, res) => {
  const body = req.body;
  try {
    const user = await User.findById(req.params.id);
    const item = {
      email: body.email,
      firstname: body.firstname,
      lastname: body.lastname,
      password: body.password,
      style: body.style,
      country: body.country,
      city: body.city,
      address: body.address,
      postalCode: body.postalCode,
      phone: body.phone,
      Dob: body.birthDay,
      iban: body.iban,
    };
    console.log(item);
    const updatedUser = await User.findByIdAndUpdate(user._id, item, {
      new: true,
    });
    console.log(updatedUser);
    await user.save();
    res.send('User updated successfully');
  } catch (error) {
    console.log('Tänne :(');
    console.error(error);
    return res.status(400).send({error: 'Error occurred while updating user'});
  }
});

usersRouter.get('/listings', extractToken, async (req, res) => {
  const deCodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!deCodedToken) {
    return res.status(401).send({error: 'Invalid Token'});
  }
  const userData = await User.findOne({email: deCodedToken.email})
    .select('listings')
    .exec();
  if (userData) {
    const listings = await Promise.all(
      userData.listings.map(async (id) => {
        return await List.findById(id);
      })
    );
    res.json(listings);
  } else {
    res.status(404).send({error: 'User not found'});
  }
});

usersRouter.delete('/stripe', (req, res) => {
  req.body.stripeId;
  console.log(req.body.stripeId);
  stripe.accounts.del(req.body.stripeId);
  return res.status(200).json({message: 'Stripe account deleted'});
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await User.findById(id);
    console.log('user', user);
    res.json(user);
    console.log('Lähetetty');
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = usersRouter;
