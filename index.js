const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

//Create the server
const app = express()

//Connect to the database
connectDB()

//Allow cors
app.use(cors())

//Express.json
app.use(express.json({extended: true}))

const PORT = process.env.PORT || 4000

//Import routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/project'))
app.use('/api/tasks', require('./routes/task'))


//Define the page index

app.get('/', (req, res) => {
    res.send('Holi')
} )

app.listen(PORT, () => {
    console.log(`The server is on port ${PORT}`)
})