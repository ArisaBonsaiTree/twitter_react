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
        // * populate the name of the value we have ref in
        // const tweets = await Tweet.find().populate('user')

        // > Now tweets has the populated info with the username
        // ^ Specify the fields, we don't need everything
        // > How to populate info
        // * In Tweet model: user : {type: ObjectId, ref: 'user' <--- same name as mongoose.model('user', userSchema)}
        // * Now go to tweets and add populate --> path for the target and select to limit what we want
        const tweets = await Tweet.find().populate({path: 'user', select: ['username']})
        res.json(tweets)
    }
    catch(err){
        res.status(500).send()
    }
})

// ^ POST request :: Sends a json format to our database
router.post('/', auth, async(req, res) => {
    // * req.body/.user???
    // * In the auth middleware, we create a req.user which stores the user id
    // * req.body is what we send via json format to the server
    // * req.user is validateUser.id that we stored in auth
    // *
    
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
            // * This is how we link it?
            user: req.user,
            username: req.username
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