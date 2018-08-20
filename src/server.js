const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');
// const sslRedirect = require('heroku-ssl-redirect');
// var cors = require('cors');

const PORT = process.env.PORT || 3000;



// let config;
// if(process.env.NODE_ENV !== 'production'){
//   config = require('./server/config/config');
// }else{
//   config = process.env;
// }
const config = require('./server/config/config');
const stripe = require('stripe')(config.stripeSecretKey);

// const stripeSecretKey = config.stripeSecretKey;
require('./server/models/Product');
require('./server/models/User');
require('./server/passport/passport');

mongoose.Promise = global.Promise;
mongoose.connect(
  config.MONGODB_URI,
  { useNewUrlParser: true }
);

const app = express();

// app.use(cors());
// app.use(sslRedirect());
app.set('trust proxy', 3);
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey],
    secret: config.cookieSecret,
    // httpOnly: false,
    secure: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./server/routes/api')(app);
require('./server/routes/auth')(app);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
