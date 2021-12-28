// > Where exactly our Tweets will be sent and how they will be handled by the server
const router = require('express').Router()

// ? Import our Database model for Tweet
const Tweet = require('../models/tweetModel')

// ? Middleware to verify the cookies were made from our server
const auth = require('../middleware/auth')

// ^ GET request :: Gives us all the Tweets from our database as json
router.get('/', async(req, res) => {
    try{
        const tweets = await Tweet.find()
        res.json(tweets)
    }
    catch(err){
        res.status(500).send()
    }
})

// ^ POST request :: Sends a json format to our database
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

// ^ DELETE request :: Deletes the Tweet that has that TweetID
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