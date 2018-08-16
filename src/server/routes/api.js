const mongoose = require('mongoose');
const passport = require('passport');

const requireLogin = require('../middleware/requireLogin');
const requireAdmin = require('../middleware/requireAdmin');

const config = require('../config/config');
const stripe = require('stripe')(config.stripeSecretKey);

const Product = mongoose.model('Product');

module.exports = app => {
  app.get('/api/userProducts', requireAdmin, async (req, res) => {
    try {
      const userId = req.user.id;
      const userProducts = await Product.findByUser(userId);

      res.send(userProducts);
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/api/createProduct', requireAdmin, async (req, res) => {
    const body = req.body;
  });

  app.post('/api/stripe', requireLogin, async (req, res) => {
    const body = req.body;
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id,
      description: 'Charge for 5 tokens'
    });
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
