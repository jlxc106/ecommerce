const requireLogin = require('../middleware/requireLogin');
const passport = require('passport');

module.exports = app => {
  app.get('/auth/currentUser', (req, res) => {
    res.send(req.user);
  });

  app.post('/auth/signIn', (req, res, next) => {
    passport.authenticate('local-signin', (err, user, info) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (info) {
        return res.send(info);
      }
      if (user) {
        req.login(user, function(err) {
          if (err) {
            return next(err, null);
          }
          return res.send(user);
        });
      }
    })(req, res, next);
  });

  app.post('/auth/signUp', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (info) {
        return res.send(info);
      }
      if (user) {
        req.login(user, function(err) {
          if (err) {
            return next(err, null);
          }
          return res.send(user);
        });
      }
    })(req, res, next);
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: [
        'profile',
        'email'
      ]
    })
  );

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

  app.get('/auth/requestAdmin', requireLogin, async (req, res) => {
    req.user.isAdmin = true;
    const user = await req.user.save();
    res.send(user);
  });
};
