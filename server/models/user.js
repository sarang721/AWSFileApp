const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: false},
    profilePicture: {type: String, required: false},
    id: {type: String},
    bucket:{type:Boolean,default:false},
    bucket_name:{type:String,default:""}
})

module.exports = mongoose.model("User", userSchema)