const mongoose = require('mongoose');
const passport = require('passport');
const AWS = require('aws-sdk');
const uuid = require('uuid/v1');

const requireLogin = require('../middleware/requireLogin');
const requireAdmin = require('../middleware/requireAdmin');

const config = require('../config/config');
const stripe = require('stripe')(config.stripeSecretKey);

const Product = mongoose.model('Product');

const s3 = new AWS.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: 'us-west-1'
});

module.exports = app => {
  app.get('/api/aws_presignedUrl', async (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'jlxc106-ecommerce-123',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => {
        res.send({ key, url });
      }
    );
  });

  app.get('/api/userProducts', requireAdmin, async (req, res) => {
    try {
      const { _id, name, email } = req.user;
      const userProducts = await Product.findByUser({ _id, name, email });
      res.send(userProducts);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post('/api/createProduct', requireAdmin, async (req, res) => {
    // const user = req.user;
    try {
      const { id, email, name } = req.user;
      const product = new Product({
        seller: {
          _id: id,
          name,
          email
        },
        ...req.body
      });
      await product.save();
      res.send(product);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  app.post('/api/stripe', requireLogin, async (req, res) => {
    const body = req.body;
    const charge = await stripe.charges.create({
      amount: 10,
      currency: 'usd',
      source: req.body.id,
      description: 'Charge for 5 tokens'
    });
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
