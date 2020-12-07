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
    },
    myEvents: {
        type: Array,
        required: false
    },
    profilepic: {
        type: String,
        required: false,
        default: ""
    }
}, {collection: 'authCollection'})
// renamed to authCollection because of conflicts with mongo internal function
module.exports = mongoose.model('User', userSchema)
