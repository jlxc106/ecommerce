const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  seller: {
    _id: Schema.Types.ObjectId,
    name: String,
    email: String
  },
  name: String,
  price: Number,
  description: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  }
});

// userSchema.methods.validatePassword = async function(password) {
//     console.log(password + ' is being validated');
//     return new Promise(async (resolve, reject) => {
//       const res = await bcrypt.compare(password, this.password);
//       console.log(res, 'what is bcrypt result');
//       if (res) {
//         resolve(this);
//       } else {
//         reject('invalid password bruh');
//       }
//     });
//   };

mongoose.model('Product', productSchema);
