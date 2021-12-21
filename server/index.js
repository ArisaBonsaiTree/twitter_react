const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const { off } = require('process')

const app = express()

// * JSON Middleware + Allow you to POST
app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000'],
    credentials: true,
}))

// * Convert cookie strings strings into objects
app.use(cookieParser())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on ${PORT}`))

// * Middleware for sending Tweets
app.use('/tweet', require('./router/tweetRouter'))

// * Middleware for logging in
app.use('/auth', require('./router/userRouter'))

// * MongoDB [Local Version for speed]
mongoose.connect(`mongodb://localhost:27017/barbter`, 
    (err) => {
        if(err) 
            return console.log(err)
        console.log('Connected to MongoDB')
    })