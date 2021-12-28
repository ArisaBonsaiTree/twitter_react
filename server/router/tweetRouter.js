// > Where exactly our Tweets will be sent and how they will be handled by the server
const router = require('express').Router()

// ? Import our Database model for Tweet
const Tweet = require('../models/tweetModel')

// ? Middleware to verify the cookies were made from our server
const auth = require('../middleware/auth')

// ^ GET request :: Gives us all the Tweets from our database as json
router.get('/', async(req, res) => {
    // ? Look into why the auth middleware bugs out here and doesn't display other Tweets
    try{
        const tweets = await Tweet.find()
        res.json(tweets)
    }
    catch(err){
        res.status(500).send()
    }
})

// ^ POST request :: Sends a json format to our database
router.post('/', auth, async(req, res) => {
    try{
        const {header, message} = req.body

        if(!message){
            return res.status(400).json({
                errorMessage: 'You need to enter a body'
            })
        }
        const newTweet = new Tweet({
            header,
            message,
            // * Added the user field to a Tweet. Now each user owns a Tweet
            user: req.user
        })

        const savedTweet = await newTweet.save()

        res.json(savedTweet)


    }catch(err){
        res.status(500).send()
    }
})

// ^ DELETE request :: Deletes the Tweet that has that TweetID
router.delete('/:id', auth, async(req, res) => {
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

        // ! Check to see if the Tweet belongs to the user
        if(existingTweeet.user.toString() !== req.user){
            return res.status(401).json({
                errorMessage: 'Unauthorized'
            })
        }
            
        await existingTweeet.delete()

        res.json(existingTweeet)
        
    }catch(err){
        res.status(500).send()
    }
})


module.exports = router