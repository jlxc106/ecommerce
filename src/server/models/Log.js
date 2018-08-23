const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
  networkStatus: Number,
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  timeStamp: Date,
  url: String,
  method: String,
  reqHeaders:{
      cookie: String,
      referer: String,
      "user-agent": String,
  }
});

mongoose.model('Log', logSchema);
