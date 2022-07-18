const express = require('express')
const cors = require('cors')

const server = express()
server.use(cors())
server.use(express.json())

//routes

//
server.get('/', (req, res) => res.send('Hello, dojo!'))

module.exports = server
