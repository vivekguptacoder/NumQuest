const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gamesWon: {
    type: Number,
    default: 0
  },
  recentScores: [
    {
      result: {
        type: String,
        enum: ['Won', 'Lost'],
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

module.exports = mongoose.model('User', UserSchema)
