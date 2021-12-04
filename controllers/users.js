//Dependencies
const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

users.get('/', (req,res) => {
  User.find({}, (err, foundUser) => {
    res.json(foundUser)
  })
})

users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
      req.session.user = createdUser;
      res.json(createdUser);
    })
});

module.exports = users;
