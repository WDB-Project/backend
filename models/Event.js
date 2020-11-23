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
    start_date: {
        type: Number,
        required: false,
    },
    end_date: {
        type: Number,
        required: false,
    },
    volunteers: {
        type: [String],
        required: false,
    }
})

module.exports = mongoose.model('Event', eventSchema)