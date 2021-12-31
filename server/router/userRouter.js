// > How our server will handle a person logging and registering for an account
const router = require('express').Router()
const User = require('../models/userModel')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// ? POST request :: A user wants to register an account
router.post('/register', async(req, res) => {
    try{
        // * Destructure it for ease of access
        const {email, username, password, passwordVerify} = req.body

        if(!email || !username || !password || !passwordVerify ){
            return res.status(400).json({
                errorMessage: 'Please enter all required fields'
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                errorMessage: "Please enter a password that's at least six characters long" 
            })
        }

        if(password !== passwordVerify){
            return res.status(400).json({
                errorMessage: 'Password and Password Verify do not match'
            })
        }

        // ^ Check to see if the account even exist in the database
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({
                errorMessage: 'An account with this email already exist'
            })
        }

        const existingUsername = await User.findOne({username})
        if(existingUsername){
            return res.status(400).json({
                errorMessage: 'An account with this username already exist'
            })
        }

        // ^ Hash the password :: We do not want to store passwords by itself in the database
        const salt = await bycrypt.genSaltSync(10)
        const passwordHash = await bycrypt.hashSync(password, salt)

        // ^ Save the user in the database
        const newUser = new User({
            email,
            username,
            passwordHash
        })

        // * Places them in the database
        const savedUser = await newUser.save()

        // ^ Time to create a token for the user
        const token = jwt.sign({
            id: savedUser._id
        }, process.env.JWT_SECRET)

        res.cookie('token', token, {
            httpOnly: true,
            sameSite:
                process.env.NODE_ENV === 'development' ? 'lax'
                : process.env.NODE_ENV === 'production' && 'none',
            secure:
                process.env.NODE_ENV === 'development' ? false
                : process.env.NODE_ENV === 'production' && true
        }).send()
        
    }catch(err){
        res.status(500).send()
    }
})

// TODO FIX LOGIN FOR USERNAME
// ? POST request :: A user wants to login to their account
router.post('/login', async (req, res) => {
    try{
        // * Destructure it 
        const {email, password} = req.body

        // ^ Basic validation before asking the database
        if(!email || !password){
            return res.status(400).json({
                errorMessage: 'Please enter all required fields'
            })
        }

        // ^ Get the user account that belongs to that email
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(401).json({
                errorMessage: 'Wrong email or password'
            })
        }

        // * Compare the password the person gave --> encrypt it and see if it matche
        const isCorrectPassword = await bycrypt.compare(password, existingUser.passwordHash)

        if(!isCorrectPassword){
            return res.status(401).json({
                errorMessage: 'Wrong email or password'
            })
        }

        const token = jwt.sign({
            id: existingUser._id // MongoDB id
        }, process.env.JWT_SECRET) // * Make sure we are using a token from our server!

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 
                process.env.NODE_ENV === 'development' ? 'lax' 
                : process.env.NODE_ENV === 'production' && 'none',
            secure: 
                process.env.NODE_ENV === 'development' ? false :
                process.env.NODE_ENV === 'production' && true
        }).send()

    }catch(err){
        res.status(500).send()
    }
})

// ? GET request :: Checks to see if the user is already logged in when we load the website
// * Make it so the user doesn't have to re-login everytime you refresh the page
router.get('/loggedIn', (req, res) => {
    try{
        const token = req.cookies.token

        if(!token){
            return res.json(null)
        }

        const validatedUser = jwt.verify(token, process.env.JWT_SECRET)
        res.json(
            validatedUser.id
        )
        
    }catch(err){
        return res.json(null)
    }
})


// ? GET request :: Delete the cookies/token to sign the user out for the session
router.get('/logout', (req, res) => {
    try{
        res.cookie('token', '', {
            httpOnly: true,
            sameSite: 
                process.env.NODE_ENV === 'development' ? 'lax' 
                : process.env.NODE_ENV === 'production' && 'none',
            secure: 
                process.env.NODE_ENV === 'development' ? false :
                process.env.NODE_ENV === 'production' && true,
            expires: new Date(0),
            
        }).send()
    }catch(err){
        return res.json(null)
    }
})

// ! Express goes by order top down :: It thought :id was logout????
router.get('/:id', async (req, res) => {
    const userId = req.params.id

    if(!userId){
        return res.status(400).json({
            errorMessage: 'User ID not in the database'
        })
    }

    const user = await User.findById(userId)

    if(!user){
        return res.status(400).json({
            errorMessage: 'User ID with this ID not in the database'
        })
    }

    // if(user.user.toString() !== req.user){
    //     console.log('NULL AND VOID')
    //     return res.status(401).json({
    //         errorMessage: 'Unauthorized'
    //     })
    // }
    

    res.json({
        email: user.email,
        username: user.username,
    })
})

module.exports = router