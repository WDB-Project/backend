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
    location: {
        type: String,
        required: true,
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
        type: [String],
        required: false,
    }
}, {collection: 'eventsCollections'})

module.exports = mongoose.model('Event', eventSchema)