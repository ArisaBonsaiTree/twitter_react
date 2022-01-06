const express = require('express')
const mongoose = require('mongoose')
// ? Access to send data to our server with only our weblinks
const cors = require('cors')
// ? Allows us access to .env files to protect us when we use secret keys
const dotenv = require('dotenv').config()
// ? Gives us a cookie that we can use after we validate the user and keep them logged in
const cookieParser = require('cookie-parser')

const morgan = require('morgan')

const app = express()

// * JSON Middleware + Allow you to POST
app.use(express.json())
// * A mini-whitelist to what links are and are not allowed to send data
app.use(cors({
    origin:['http://localhost:3000', 'https://barbter.netlify.app'],
    credentials: true,
    exposedHeaders: ['barbter_cookie']
}))

app.use(morgan('tiny'))

// * Convert cookie strings strings into objects
app.use(cookieParser())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on ${PORT}`))

// * Middleware for sending Tweets
app.use('/tweet', require('./router/tweetRouter'))

// * Middleware for logging in
app.use('/auth', require('./router/userRouter'))

// * MongoDB [Local Version for speed]
mongoose.connect(`mongodb+srv://rosenthal:${process.env.MONGO_PASSWORD}@arisadatabase.wez6h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, 
    (err) => {
        if(err) 
            return console.log(err)
        console.log('Connected to MongoDB')
    })