const express = require('express')
const authRouter  = require('./routes/auth.route')
const apiRouter = require('./routes/api.route')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/publish', apiRouter)

module.exports = app