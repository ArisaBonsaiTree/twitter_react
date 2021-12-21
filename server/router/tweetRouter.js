// > The format for our website to send Tweets
const router = require('express').Router()

// ? Import our Database model for Tweet
const Tweet = require('../models/tweetModel')

// ? Middleware to verify the cookies were made from our server
const auth = require('../middleware/auth')

// ^ Get the Tweets from the Database
router.get('/', async(req, res) => {
    try{
        const tweets = await Tweet.find()
        res.json(tweets)
    }
    catch(err){
        res.status(500).send()
    }
})

// ^ Post a Tweet into the database
router.post('/', async(req, res) => {
    try{
        const {header, message} = req.body
        const newTweet = new Tweet({
            header,
            message
        })

        const savedTweet = await newTweet.save()

        res.json(savedTweet)


    }catch(err){
        res.status(500).send()
    }
})

// ^ Delete a Tweet you didn't like
router.delete('/:id', async(req, res) => {
    try{
        const tweetId = req.params.id

        if(!tweetId){
            return res.status(400).json({errorMessage: 'Tweet ID not in the database'})
        }
        
        const existingTweeet = await Tweet.findById(tweetId)

        if(!existingTweeet){
            return res.status(400).json({
                errorMessage: 'Tweet ID with this ID is not in the database'
            })
        }
            
        await existingTweeet.delete()

        res.json(existingTweeet)
        
    }catch(err){
        res.status(500).send()
    }
})


module.exports = router