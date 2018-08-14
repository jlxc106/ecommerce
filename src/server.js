const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');

const config = require('./server/config/config');
const stripe = require('stripe')(config.stripeSecretKey);
const requireLogin = require('./server/middleware/requireLogin');

// const stripeSecretKey = config.stripeSecretKey;
require('./server/models/User');
require('./server/passport/passport');

mongoose.Promise = global.Promise;
mongoose.connect(
  config.MONGODB_URI,
  { useNewUrlParser: true }
);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/currentUser', (req, res) => {
  res.send(req.user);
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      // 'https://www.googleapis.com/auth/plus.login'
      'profile',
      'email'
    ]
  })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/error' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/auth/google/error', (req, res) => {
  res.send({ error: 'not authorized' });
});

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/requireLogin', requireLogin, async (req, res) => {
  res.send('hola hola');
});

app.post('/api/stripe', requireLogin, async (req, res) => {
  // console.log(req.body);
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    source: req.body.id,
    description: 'Charge for 5 tokens'
  });
  // console.log(charge);
  req.user.credits += 5;
  const user = await req.user.save();

  res.send(user);
});

// console.log(path.join(__dirname, "/../public/"));

app.use(express.static(path.join(__dirname, '/../public')));

app.listen(3000, () => console.log(`listening on port 3000`));
