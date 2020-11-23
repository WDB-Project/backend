const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const router = express.Router()

const app = express()
const port = process.env.PORT || 3000
const db = mongoose.connection
const url = 'mongodb://127.0.0.1:27017/upandcoming'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.connect(url, { useNewUrlParser: true })


router.get('/', function (req, res) {
    // root path
})

const eventsRouter = require('./routes/events.js')
app.use('/events', router);

const authRouter = require('./routes/auth.js')
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})