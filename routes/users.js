// User's routes
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {check} = require('express-validator')

//Create an user
router.post('/',
    [
        check('username', "The username can't be empty").not().isEmpty(),
        check('email', 'The email must be valid').isEmail(),
        check('password', 'Your password must have at least 5 characters').isLength({min: 5})
    ],
    userController.createUser)

module.exports = router