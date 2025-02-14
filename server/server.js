const express = require('express')
const connectDB  = require('./config/db')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const gameRoutes = require('./routes/gameRoutes')
const userRoutes = require('./routes/userRoutes')
const app = express()

require('dotenv').config()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/', authRoutes)
app.use('/game', gameRoutes)
app.use('/user', userRoutes);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})