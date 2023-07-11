const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/Auth.Controller')

router.post('/register', async (req,res,next) => {
    res.send('register.route')
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
