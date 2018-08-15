const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

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
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    proxy:true
  },
    function(req, email, password, done){
      console.log('--------email ',email);
      console.log('--------pw',password);
      User.findOne({email}, function(err, user){
        if(err){
          console.log('34')
          return done(err);
        }
        if(!user){
          console.log('38 ')
          // return done(JSON.stringify({message: 'Invalid user/pw combo'}), null);
          return done(null, false, {message: 'Invalid user/pw combo'});
        }
        console.log(42)
        if(user.password.length === 0){
          // return done(JSON.stringify({message: 'No password set for account, sign up to set up password'}), null);

          return done(null, false, {message: 'No password set for account, sign up to set up password'})
        }
        console.log(46);
        if(!user.validatePassword(password)){
          // return done(JSON.stringify({message: 'Invalid user/pw combo'}), null);

          return done(null, false, {message: 'Invalid user/pw combo'});
        }
        console.log('user 50 ', user);
        return done(null, user);
      })
    }
  )
)

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
