const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    realname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    events: {
        type: [String],
        required: false,
    }
}, {collection: 'authCollection'})
// hash user password before saving into database

module.exports = mongoose.model('User', userSchema)
