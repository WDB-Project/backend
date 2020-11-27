const mongoose = require('mongoose');
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
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
}, {collection: 'events'})

module.exports = mongoose.model('Event', eventSchema)