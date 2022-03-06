const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    name: { type: String,  },
    email: { type: String, unique: true },
    isPromoted: {type: Boolean, default: null}
})

const User = mongoose.model('User',userSchema)

module.exports = User;