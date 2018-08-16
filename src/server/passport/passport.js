const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const validator = require('email-validator');

const config = require('../config/config');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  console.log('serialize user: ', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('trying to deserialize');
  User.findById(id).then(user => {
    console.log('deserialize user: ', user);
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
            console.log('update password');
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

      //   , function(err, user){
      //   if(err){
      //     console.log('34')
      //     return done(err);
      //   }
      //   if(user){
      //     return done(null, false, {message: "Account already exists under that email"})
      //   }
      //   // if(!user){
      //   //   console.log('38 ')
      //   //   // return done(JSON.stringify({message: 'Invalid user/pw combo'}), null);
      //   //   return done(null, false, {message: 'Invalid email/password'});
      //   // }
      //   // console.log(42)
      //   // if(user.password.length === 0){
      //   //   // return done(JSON.stringify({message: 'No password set for account, sign up to set up password'}), null);

      //   //   return done(null, false, {message: '--will change later on -- No password set for account, sign up to set up password'})
      //   // }
      //   // console.log(46);
      //   // if(!user.validatePassword(password)){
      //   //   // return done(JSON.stringify({message: 'Invalid user/pw combo'}), null);

      //   //   return done(null, false, {message: 'Invalid email/password'});
      //   // }
      //   console.log('user 50 ', user);
      //   return done(null, user);
      // })
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
      console.log('--------email ', email);
      console.log('--------pw', password);

      try {
        const user = await User.findOne({ email });
        if (!user) {
          console.log(38);
          return done(null, false, { message: 'Invalid email/password' });
        }
        console.log(42);
        if (user.password.length === 0) {
          return done(null, false, {
            message:
              '--will change later on -- No password set for account, sign up to set up password'
          });
        }
        console.log(46);
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
      console.log(profile);
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
