const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SportEvent = new Schema(
    {
        author: { 
            name: { type: String },
            uid: { type: String }
        },
        name: { type: String, required: true },
        serie: { type: String, required: false },
        date: { type: Date, required: true },
        discipline: { type: String, required: true, },
        place: { type: String, required: true, },
        link: { type: String, required: false, },
        type: { type: String, required: false, },
        isActive: { type: Boolean, required: false },
        coordinates: {
            lat: { type: Number, required: true, },
            lng: { type: Number, required: true, }
        },
        description: {
            type: String, required: false,
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model('events', SportEvent);
