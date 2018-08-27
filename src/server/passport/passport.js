const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const validator = require('email-validator');
const serialize = require('serialize-javascript');
const xss = require('xss');

const config = require('../config/config');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      proxy: true
    },
    async (req, email, password, done) => {
      const { name } = req.body;
      if (!validator.validate(email)) {
        return done(null, false, { message: 'Invalid email' });
      }
      if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
        return done(null, false, { message: 'Invalid password' });
      }
      try {
        var user = await User.findOne({ email });
        if (user) {
          if (user.password === '' && user.name === name) {
            user.password = password;
            const updatedUser = await user.save();
            return done(null, updatedUser);
          }
          return done(null, false, {
            message: 'Account already exists under that email'
          });
        }
        const newUser = await new User({
          name,
          email,
          password
        }).save();
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.use(
  'local-signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      proxy: true
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Invalid email/password' });
        }
        if (user.password.length === 0) {
          return done(null, false, {
            message:
              'No password set for account, sign up to set up password. Make sure to use the same name as it appears on your account page.'
          });
        }
        user.validatePassword(password).then(
          confirmedUser => {
            return done(null, confirmedUser);
          },
          () => {
            return done(null, false, { message: 'Invalid email/password' });
          }
        );
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        }).save();
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
