const User = require('../models/User')
const Leaderboard = require('../models/Leaderboard')

exports.winGame = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    user.gamesWon += 1

    user.recentScores.push({ result: 'Won' })

    if (user.recentScores.length > 10) {
      user.recentScores.shift()
    }

    await user.save()

    let leaderboardEntry = await Leaderboard.findOne({ username: user.username })
    if (!leaderboardEntry) {
      leaderboardEntry = new Leaderboard({ username: user.username, gamesWon: user.gamesWon })
    } else {
      leaderboardEntry.gamesWon = user.gamesWon
    }
    await leaderboardEntry.save()

    await Leaderboard.find().sort({ gamesWon: -1 }).limit(10).exec()

    res.json({ message: 'Game won!', gamesWon: user.gamesWon })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.loseGame = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    user.recentScores.push({ result: 'Lost' })

    if (user.recentScores.length > 10) {
      user.recentScores.shift()
    }

    await user.save()

    res.json({ message: 'Game lost!', recentScores: user.recentScores })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ gamesWon: -1 }).limit(10)
    res.json(leaderboard)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
