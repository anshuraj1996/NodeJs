const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, required:true , unique:true},
    password: {type: String}
})

const User = mongoose.model('User',userSchema)

module.exports = User;