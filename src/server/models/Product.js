const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  seller: {
    _id: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    email: String
  },
  name: String,
  price: Number,
  description: {
    type: String,
    default: ''
  },
  quantity: Number,
  imageUrl: {
    type: String,
    default: ''
  }
});

productSchema.statics.findByUser = async function(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const userProducts = await this.find({ seller: user });
      resolve(userProducts);
    } catch (err) {
      reject(err);
    }
  });
};

mongoose.model('Product', productSchema);
