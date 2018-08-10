const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const config = require('./server/config/config');
const requireLogin = require('./server/middleware/requireLogin');

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

// app.use(express.static('public'));

app.listen(3000, () => console.log(`listening on port 3000`));
