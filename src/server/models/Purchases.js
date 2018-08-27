const mongoose = require('mongoose');
const { Schema } = mongoose;

const purchaseSchema = new Schema({
  customer: {
    _id: { type: Schema.Types.ObjectId, ref: 'User' },
    address: {
      address: String,
      city: String,
      state: String,
      country: String,
      zip: Number
    }
  },
  product: {
    _id: { type: Schema.Types.ObjectId, ref: 'Product' },
    price: Number,
    quantity: Number
  },
  merchant: {
    _id: { type: Schema.Types.ObjectId, ref: 'User' }
  }
});

mongoose.model('Purchase', purchaseSchema);
