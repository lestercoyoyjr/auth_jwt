const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/Auth.Controller')
const { authSchema } = require ('../helpers/validation_schema')
const { signAccessToken, signRefreshToken } = require('../helpers/jwt_helper')
const createError = require('http-errors')

router.post('/register', async (req,res,next) => {
    try {
        // const { email, password } = req.body
        // if (!email || !password) throw createError.BadRequest()
        const result = await authSchema.validateAsync(req.body)
        console.log('result')
      
        const doesExist = await User.findOne({ email: result.email })
        if (doesExist)
            throw createError.Conflict(`${result.email} is already been registered`)
        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)
        res.send(savedUser)
        
    } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error)
    }
})

router.post('/login', async (req,res,next) => {
    try {
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({email : result.email})
        if(!user) throw createError.NotFound("User not registered")

        const isMatch = await user.isValidPassword(result.password)

        if(!isMatch) throw createError.Unauthorized('username/password not valid')

        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)

        res.send({accessToken})
    } catch (error) {
        if (error.isJoi === true) return next(createError.BadRequest("Invalid Username/Password"))
        next(error)
    }
})

router.post('/refresh-token', async (req,res,next) => {
    res.send('refresh-token.route')
})

router.post('/logout', async (req,res,next) => {
    res.send('logout.route')
})

/*

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/refresh-token', AuthController.refreshToken)

router.delete('/logout', AuthController.logout)

module.exports = router
*/
