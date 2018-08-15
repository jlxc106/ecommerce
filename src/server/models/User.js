const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: String,
    googleId: String,
    email: String,
    credits: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        default: ""
    }
})

userSchema.methods.validatePassword = async function(password){
    console.log(password + " is being validated");
    const res = await bcrypt.compare(password, this.password)
    if(res){
        return true;
    }
    else{
        return false;
    }
}

userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err,hash)=>{
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
})


mongoose.model('User', userSchema);