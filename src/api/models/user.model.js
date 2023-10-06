const mongoose = require("mongoose");
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    password : {
        type: String,
        required : true
    },
    userToken: {
        type: String
    }
})
userSchema.pre('save',async function(next){
    console.log('here')
    try{
       const salt = await bcrypt.genSalt(10);
       const hashPassword = await bcrypt.hash(this.password,salt)
       this.password = hashPassword
       next();
    }
    catch(error){
        next(error)
    }
})


const User = mongoose.model('users', userSchema);


module.exports = User