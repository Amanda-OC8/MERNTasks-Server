// Authetication's routes
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')
const auth = require('../middleware/auth');

//Login

//Create an user
router.post('/',
    [
        check('email', 'The email must be valid').isEmail(),
        check('password', 'Your password must have at least 5 characters').isLength({ min: 5 })
    ],
    authController.authUser)


//Get the authenticate user
    router.get('/', auth , authController.authenUser)
module.exports = router