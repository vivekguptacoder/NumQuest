const express = require('express')
const { winGame, loseGame, getLeaderboard } = require('../controller/gameController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/won', authMiddleware, winGame)
router.post('/lost', authMiddleware, loseGame)
router.get('/leaderboard', authMiddleware, getLeaderboard)

module.exports = router
