const mongoose = require('mongoose');
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    addressOne: {
        type: String,
        required: false
    },
    addressTwo: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: false
    },
    organization: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    contact: {
        type: String,
        required: false
    },
    startDate: {
        type: Number,
        required: false,
    },
    endDate: {
        type: Number,
        required: false,
    },
    volunteers: {
        type: Array,
        required: false,
    }
}, {collection: 'eventsCollections'})

module.exports = mongoose.model('Event', eventSchema)