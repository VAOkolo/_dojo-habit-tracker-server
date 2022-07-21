const express = require('express')

const cors = require('cors')

const server = express()
server.use(cors())
server.use(express.json())

//routes
const habitRoutes = require('./routes/habits')
// const authRoutes = require('./controllers/auth')
const userRoutes = require('./routes/users')
//
server.use('/habits', habitRoutes)
// server.use('/auth', authRoutes )
server.use('/user', userRoutes)
server.get('/', (req, res) => res.send('Hello, dojo!'))

module.exports = server
