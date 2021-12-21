// > The way our Tweet will be formatted
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const tweetSchema = new mongoose.Schema({
    header: {type: String},
    message: {type: String},
},{
    timestamps: true
})

const Tweet = mongoose.model('tweet', tweetSchema)

module.exports = Tweet