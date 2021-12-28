// > The structure of a Tweet
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const tweetSchema = new mongoose.Schema({
    header: {type: String},
    message: {type: String},
},{
    timestamps: true
})

// ? Place the name tweet[tweets] using the schema 'tweetSchema'
const Tweet = mongoose.model('tweet', tweetSchema)

module.exports = Tweet