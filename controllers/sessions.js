//Dependencies
const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/', (req, res) => {
    res.json(req.session.user);
})

sessions.post('/', (req, res) => {
    User.findOne({username:req.body.username}, (error, foundUser) => {
        res.json(foundUser)
    });
});

sessions.post('/', (req, res) => {
    User.findOne({username:req.body.username}, (error, foundUser) => {
        if(foundUser === null){
            res.json({
                message:'user not found',
            });
        } else {
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
            if(doesPasswordMatch){
              req.session.user = foundUser;
              res.json(foundUser)
            } else {
                res.json({
                    message:'user not found'
                });
            }
        }
    });
});

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.json({
            destroyed:true
        });
    })
});

module.exports = sessions
