// > Auth middleware the checks to see if the user is logged in and is validated
const jwt = require('jsonwebtoken')

function auth(req, res, next){
    try{
        const token = req.cookies.token
        if(!token) {
            return res.status(401).json({
                errorMessage: 'Unauthorized'
            })
        }

        // * Checks to see if the TOKEN was made by the server using the secret key
        const validatedUser = jwt.verify(token, process.env.JWT_SECRET)
        // ? Set in the request object a user key that has the value id :: REQ is an object that we can add to it
        // ? validateUser has id: #### || iat: ####
        req.user = validatedUser.id
        
        next()
    }catch(err){
        // ? Tell the user they are unauthorized
        return res.status(401).json({
            errorMessage: 'Unauthorized'
        })
    }
}

module.exports = auth