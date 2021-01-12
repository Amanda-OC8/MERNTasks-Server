const User = require('../models/Users')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res) => {
    
    //Check the possible errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        
        // console.log(errors.array()[0])
        return res.status(400).json({ errors: errors.array()[0] })
    }

    const { email, password } = req.body;

    
    try {
        //Check if the user is registred
        let user = await User.findOne({ email })
        
        if (!user) {
            return res.status(400).json({msg: 'The user or the password is wrong'})
        }

        //Check the password
        const passCorrect = await bcryptjs.compare(password, user.password)
        if (!passCorrect) {
            return res.status(400).json({ msg: 'The user or the password is wrong' })
        }

        //Create the jwt and create and sign them
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
    }
}

//Get what user is authenticated
exports.authenUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({user})
    } catch (error){
        console.log(error)
        return res.status(500).json({ msg: 'An error happeneded' })

    }
}