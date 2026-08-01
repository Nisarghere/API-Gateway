const express = require('express')
const authRouter  = require('./routes/auth.route')
const apiRouter = require('./routes/api.route')
const cookieParser = require('cookie-parser')
const counsumerRouter = require('./routes/consumer.route')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/api', apiRouter)
app.use('/apis', apiRouter)
app.use('/api', counsumerRouter)


module.exports = app