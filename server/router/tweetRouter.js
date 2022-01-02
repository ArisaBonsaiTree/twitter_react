// > Where exactly our Tweets will be sent and how they will be handled by the server
const router = require('express').Router()

// ? Import our Database model for Tweet
const Tweet = require('../models/tweetModel')

// ? Middleware to verify the cookies were made from our server
const auth = require('../middleware/auth')

// ^ GET request :: Gives a json object with all the Tweets
router.get('/', async(req, res) => {
    try{
        // * Populate the user of tweetModel with the userModel
        // ? path: Pick the place where the Foreign_Key is located in the model
        // ? What do we want to populate into that Foreign_Key?
        const tweets = await Tweet.find().populate({path: 'userId', select: ['username']})
        res.json(tweets)
    }
    catch(err){
        res.status(500).send()
    }
})

// ^ POST request :: Sends a json format to our database
router.post('/', auth, async(req, res) => {
    try{
        // * auth middleware is runned first to see if the user is logged in
        // ? The middleware will look to see if they are logged in
        
        // * Destructure what we send
        const {username, message} = req.body

        // * No message will prevent you
        if(!message){
            return res.status(400).json({
                errorMessage: 'You need to enter a body'
            })
        }

        // * Place the propert values into the tweetModel
        const newTweet = new Tweet({
            username,
            message,
            userId: req.user, // ? The user _id is placed here :: Placed by the auth middleware
        })

        // * Place the Tweet in the database
        const savedTweet = await newTweet.save()        
        
        // * Gives us a json response of the Tweet
        // username
        // message
        // userId <-- The user id that is needed to populate it -- [FP]
        // _id <--- The id of the [PK]
        // createdAt
        // updatedAt
        res.json(savedTweet)


    }catch(err){
        res.status(500).send()
    }
})


// ! REFACTOR LATER>>>>>

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
            console.log('NULL AND VOID')
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