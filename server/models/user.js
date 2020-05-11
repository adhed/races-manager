const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        uid: { type: String, required: true },
        favouriteEvents: [String],
        name: { type: String, required: false },
        details: {
            isAdmin: { type: Boolean, required: false },
            required: false
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User);
