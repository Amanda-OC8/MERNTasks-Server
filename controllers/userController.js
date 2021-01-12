const User = require('../models/Users')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {

    //Check the possible errors
    const errors= validationResult(req)

    if (!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array()})
    }
    // Extract email and password
    const {email, password} = req.body
    
    try {
        //Check the unique email
        let user = await User.findOne({email})

        if (user) {
            return res.status(400).json({msg: 'The email already exists in the database'})
        }

        //Create the new user
        user = new User(req.body)
        
        //Hash the password
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(password, salt)

        //Save the user
        await user.save()

        //Create and sign the json web token
        const payload = {
            user: {
                id: user.id
            }
        }
        //Sign
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;

           //Confirmation message
            res.json({ token });
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).send('An error occurrs')
    }
}