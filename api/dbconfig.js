const { MongoClient } = require('mongodb')

// use for docker
// const connectionUrl = process.env.DB_CONNECTION; 

// use for heroku
const connectionUrl =  process.env.MONGODB_URI;  

const dbName = process.env.DB_NAME

const init = async () => {
    client = await MongoClient.connect(connectionUrl)
    console.log('connected to database!', dbName)
    return client.db(dbName)
}

module.exports = { init }
