// > Simple user model that just requires an email and password
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema)

module.exports = User