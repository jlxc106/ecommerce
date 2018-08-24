const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');

const PORT = process.env.PORT || 3000;

const config = require('./server/config/config');
const stripe = require('stripe')(config.stripeSecretKey);

require('./server/models/Product');
require('./server/models/User');
require('./server/models/Log');
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
    keys: [config.cookieKey],
    secret: config.cookieSecret
  })
);
app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV == 'production'){
  require('./server/middleware/logs')(app);
}

require('./server/routes/api')(app);
require('./server/routes/auth')(app);

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
