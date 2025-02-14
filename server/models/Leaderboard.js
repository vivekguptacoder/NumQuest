const mongoose = require('mongoose')

const LeaderboardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  gamesWon: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Leaderboard', LeaderboardSchema)
