const mongoose = require('mongoose');
// const passport = require('passport');
const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const serialize = require('serialize-javascript');
const xss = require('xss');

const requireLogin = require('../middleware/requireLogin');
const requireAdmin = require('../middleware/requireAdmin');
const config = require('../config/config');

const stripe = require('stripe')(config.stripeSecretKey);
const Product = mongoose.model('Product');
const Purchase = mongoose.model('Purchase');

const s3 = new AWS.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: 'us-west-1'
});

module.exports = app => {
  app.get('/api/aws_presignedUrl/:numFiles', async (req, res) => {
    const numFiles = req.params.numFiles;
    let listKeys = [];
    for (var i = 0; i < numFiles; i++) {
      listKeys.push(`${req.user.id}/${uuid()}.jpeg`);
    }
    const promList = listKeys.map(key => {
      return new Promise(async (resolve, reject) => {
        try {
          let url = await s3.getSignedUrl('putObject', {
            Bucket: 'jlxc106-ecommerce-123',
            ContentType: 'image/jpeg',
            Key: key
          });
          resolve({ key, url });
        } catch (e) {
          reject(e);
        }
      });
    });
    const promiseArray = await Promise.all(promList);
    res.send(promiseArray);
  });

  app.post('/api/stripe', requireLogin, async (req, res) => {
    const body = req.body;
    try {
      const updatedProduct = await Product.findByIdAndUpdateQuantity(
        body.productId,
        body.purchaseQuantity
      );
      // const abc = await stripe.createSource(card, ownerInfo);
      const charge = await stripe.charges.create({
        amount: body.price * body.purchaseQuantity,
        currency: 'usd',
        source: req.body.id,
        description: `${body.description}`
      });
      const purchase = new Purchase({
        customer: {
          _id: req.user._id,
          address: body.address
        },
        product: {
          _id: body.productId,
          price: body.price,
          quantity: body.purchaseQuantity
        },
        merchant: {
          _id: body.sellerId
        }
      });
      await purchase.save();
      console.log(charge);
      res.send(xss(JSON.stringify(updatedProduct)));
    } catch (err) {
      res.send({ error: err });
    }
  });

  app.get('/api/userProducts', requireAdmin, async (req, res) => {
    try {
      const { _id, name, email } = req.user;
      const userProducts = await Product.findByUser({ _id, name, email });
      res.send(xss(JSON.stringify(userProducts)));
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post('/api/createProduct', requireAdmin, async (req, res) => {
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
      res.send(xss(JSON.stringify(product)));
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  app.get('/api/getProducts', async (req, res) => {
    try {
      const listOfProducts = await Product.find({}, null);
      res.send(xss(JSON.stringify(listOfProducts)));
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/api/getProductById', async (req, res) => {
    try {
      const id = req.body.id;
      const getProduct = await Product.findById(id);
      res.send(
        xss(JSON.stringify(getProduct)) || { message: 'Invalid Product ID' }
      );
    } catch (err) {
      res.send({ message: 'Invalid Product ID' });
    }
  });
};
