const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    //Read the token
    const token = req.header('x-auth-token')
    

    //Rev the token exists
    if (!token) {
        return res.status(401).json({msg: 'There is no Token, you not have permission'})
    }

    //Validation token
    try {
        const cypher = jwt.verify(token, process.env.SECRET)
        req.user = cypher.user
        next()
    } catch (error){
        res.status(400).json({msg: 'Invalide token'})
    }
}