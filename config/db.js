const mongoose = require('mongoose')

require('dotenv').config({ path: '.env' })

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('Connected to the database')
    } catch(error) {
        console.log(`You have an error: ${error}`)
        process.exit(1) //Stop the app
    }
    
}

module.exports= connectDB