const express = require('express')
const router = express.Router()
const Message = require('../models/messages.js')

router.get('/', (req,res) => {
  Message.find({}, (err, foundMessages) => {
    res.json(foundMessages)
  })
})

router.post('/', (req,res) => {
  Message.create(req.body, (err, createdMessages) => {
    res.json(createdMessages)
  })
})

router.delete('/:id', (req,res) => {
  Message.findByIdAndRemove(req.params.id, (err,deletedMessages) => {
    res.json(deletedMessages)
  })
})

router.put('/:id', (req,res) => {
  Message.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMessages) => {
    res.json(updatedMessages)
  })
})

module.exports = router;
