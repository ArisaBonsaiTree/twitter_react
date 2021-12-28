// > How our server will handle a person logging and registering for an account
const router = require('express').Router()
const User = require('../models/userModel')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// ? POST request :: A user wants to register an account
router.post('/', async(req, res) => {
    try{
        // * Destructure it for ease of access
        const {email, password, passwordVerify} = req.body

        if(!email || !password || !passwordVerify){
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
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                errorMessage: 'An account with this email already exist'
            })
        }

        // ^ Hash the password :: We do not want to store passwords by itself in the database
        const salt = await bycrypt.genSaltSync(10)
        const passwordHash = await bycrypt.hashSync(password, salt)

        // ^ Save the user in the database
        const newUser = new User({
            email,
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



module.exports = router