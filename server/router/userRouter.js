// > How our server will handle a person logging and registering for an account
const router = require('express').Router()
const User = require('../models/userModel')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = require('../middleware/auth')

// ^ POST request :: User wants to register for an account
router.post('/register', async(req, res) => {
    try{
        // * Destructure it for ease of access
        const {email, username, password, passwordVerify} = req.body

        // * User is missing fields
        if(!email || !username || !password || !passwordVerify ){
            return res.status(400).json({
                errorMessage: 'Please enter all required fields'
            })
        }

        // * Password must be greater than 6 characters
        if(password.length < 6){
            return res.status(400).json({
                errorMessage: "Please enter a password that's at least six characters long" 
            })
        }

        // * Password and PasswordVerify must match
        if(password !== passwordVerify){
            return res.status(400).json({
                errorMessage: 'Password and Password Verify do not match'
            })
        }

        // * A MongoDB command to search the database for an email
        const existingEmail = await User.findOne({email})
        
        // * Check to see if the email exist in the database
        if(existingEmail){
            return res.status(400).json({
                errorMessage: 'An account with this email already exist'
            })
        }

        // * A MongoDB command to search the database for a username
        const existingUsername = await User.findOne({username})
        
        if(existingUsername){
            return res.status(400).json({
                errorMessage: 'An account with this username already exist'
            })
        }

        // * ===================================================================
        // ^ After passing the validation :: HAsh the password :: NEVER PLACE THE PASSWORD IN THE DB

        // * A random way to generate salt to prevent salt reuse
        const salt = await bycrypt.genSaltSync(10)
        // * Hash the password using bycrypt
        const passwordHash = await bycrypt.hashSync(password, salt)

        // * Create a user object
        const newUser = new User({
            email,
            username,
            profileBanner: 'https://res.cloudinary.com/durogtr7u/image/upload/v1641253201/banner_kbfvfr.png',
            profilePicture: 'https://res.cloudinary.com/durogtr7u/image/upload/v1641249658/no_pfp_vlrxz1.png',
            passwordHash
        })

        // * Places the user object into the database
        const savedUser = await newUser.save()

        // * ============================================
        // ^ Create a unique token with the given credentials and a cookie
        
        // * A unique key given to this id and only this id with the given credentials
        const token = jwt.sign(
            {
                id: savedUser._id // ? Get MongoDB id and place it in the token
            }, 
            process.env.JWT_SECRET
        )

        // * A cookie that utilizes the token to allow a user to stay logged in
        res.cookie(
            'barbter_cookie', // ? Name of the cookie we are giving it
            token, // ? Where the data from the token will come from
            {
                httpOnly: true,
                sameSite:
                    process.env.NODE_ENV === 'development' ? 'lax'
                    : process.env.NODE_ENV === 'production' && 'none',
                secure:
                    process.env.NODE_ENV === 'development' ? false
                    : process.env.NODE_ENV === 'production' && true
            }
        ).send()
        
    }catch(err){
        res.status(500).send()
    }
})

// ^ POST request :: A user wants to login to their account
router.post('/login', async (req, res) => {
    try{
        // * Destructure it 
        const {email, password} = req.body

        // * Basic validation before asking the database
        if(!email || !password){
            return res.status(400).json({
                errorMessage: 'Please enter all required fields'
            })
        }

        // * Get the user account that belongs to that email
        const existingUser = await User.findOne({email})
        
        // * If a user without that email is sent, send this
        if(!existingUser){
            return res.status(401).json({
                errorMessage: 'Wrong email or password'
            })
        }

        // * See if the password they gave is the same as an encrypted password
        const isCorrectPassword = await bycrypt.compare(password, existingUser.passwordHash)

        if(!isCorrectPassword){
            return res.status(401).json({
                errorMessage: 'Wrong email or password'
            })
        }

        // * Create a token for the user
        const token = jwt.sign(
            {
                id: existingUser._id // ? Get MongoDB id and place it in the token
            },  
            process.env.JWT_SECRET // * Make sure we are using a token from our server!
        )

        res.cookie(
            'barbter_cookie', 
            token, 
            {
                httpOnly: true,
                sameSite: 
                    process.env.NODE_ENV === 'development' ? 'lax' 
                    : process.env.NODE_ENV === 'production' && 'none',
                secure: 
                    process.env.NODE_ENV === 'development' ? false :
                    process.env.NODE_ENV === 'production' && true
            }
        ).send()

    }catch(err){
        res.status(500).send()
    }
})

// ^ GET request :: Delete the cookie 'barbter_cookie from localHost
// ? You need to be logged in to logout
router.get('/logout', auth, async(req, res) => {
    try{
        res.cookie(
            'barbter_cookie', 
            '', 
            {
                httpOnly: true,
                sameSite: 
                    process.env.NODE_ENV === 'development' ? 'lax' 
                    : process.env.NODE_ENV === 'production' && 'none',
                secure: 
                    process.env.NODE_ENV === 'development' ? false :
                    process.env.NODE_ENV === 'production' && true,
                expires: new Date(0), // ? This is what clears it
            }
        ).send()
        
    }catch(err){
        return res.json(null)
    }
})

// ^ GET request :: Just like the auth middleware, but now axios can call it
// ? Not sure what other way to see if a user has the barbter_cookie without entering credentials
router.get('/loggedIn', async(req, res) => {
    try{
        const token = req.cookies.barbter_cookie

        // * Does the cookie even exist?
        if(!token){
            return res.json(null)
        }

        // * Mix the token with JWT_SECRET 
        const validatedUser = jwt.verify(
            token, 
            process.env.JWT_SECRET
        )

        const existingUser = await User.findById(validatedUser.id)
        
        // * Gives us the user email and username 
        res.json({
            email: existingUser.email,
            username: existingUser.username,
        })
        
    }catch(err){
        return res.json(null)
    }
})

router.get('/:username', async(req, res) => {
    try{

        const {username} = req.params

        if(!username){
            return res.status.json({
                errorMessage: 'No username detected'
            })
        }

        
        const existingUser = await User.findOne({username})

        if(!existingUser){
            return res.status(401).json({
                errorMessage: "User doesn't exist"
            })
        }
        return res.json({
            username: existingUser.username,
            profileBanner: existingUser.profileBanner,
            profilePicture: existingUser.profilePicture
        })
    }catch(err){
        return res.json(500).send()
    }
})

module.exports = router