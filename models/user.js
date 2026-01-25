const mongoose = require("mongoose");
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = Schema({
    email:{
        type:String,
        required:true
    },
}) 
//Plugin for locaal-mongoose
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User",userSchema);
module.exports = User;