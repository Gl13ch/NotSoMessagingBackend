//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const db = mongoose.connection;
require('dotenv').config()

//Port
const PORT = process.env.PORT || 3003

//Database
const MONGODB_URI  = process.env.MONGODB_URI

// Connect to Mongo
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middleware
app.use(express.json())
app.use(cors())

//Controllers
const userController = require('./controllers/users.js');
const messageController = require('./controllers/messages.js');
app.use('/messages', messageController)
app.use('/users', userController)

//Route
app.get('/', (req, res) => {
    res.redirect('/messages')
})

//Listeners
app.listen(PORT, () => {
  console.log('Listening on...', PORT);
})
