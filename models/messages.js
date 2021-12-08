const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema(
  {
    name: String,
    content: String,
    date: {type: Date, default: Date.now}
  },
  { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)
module.exports = Message
