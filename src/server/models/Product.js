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

productSchema.statics.findByIdAndUpdateQuantity = async function(_id, deltaQuantity){
    return new Promise(async (resolve, reject)=>{
        try{
            let updatedDoc = await this.findByIdAndUpdate(_id, {$inc: {quantity: `-${deltaQuantity}`}}, {new:true})
            if(updatedDoc.quantity < 0 ){
                updatedDoc.quantity = updatedDoc.quantity + deltaQuantity;
                await updatedDoc.save();
                return reject({error: 'insufficient quantity in stock'});
            }
            resolve(updatedDoc);
        }catch(err){
            reject(err);
        }
    })
}



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
