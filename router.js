const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const router = express.Router()

const app = express()
const port = process.env.PORT || 3000

const db = mongoose.connection
const url = 'mongodb+srv://vegautam:Mongo314209!@cluster0.dn9qy.mongodb.net/volunteerio?retryWrites=true&w=majority'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

router.get('/', function (req, res) {
    console.log("sup")
})

const eventsRouter = require('./routes/events.js')
app.use('/events', eventsRouter);

const authRouter = require('./routes/auth.js')
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})