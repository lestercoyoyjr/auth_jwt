const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/Auth.Controller')

router.post('/register', async (req,res,next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw createError.BadRequest()
      
        const doesExist = await User.findOne({ email: result.email })
        if (doesExist)
            throw createError.Conflict(`${result.email} is already been registered`)
        const user = new User({email, password})
        const savedUser = await user.save()
        
        res.send(savedUser)
        
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
})

router.post('/login', async (req,res,next) => {
    res.send('login.route')
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
