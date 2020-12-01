const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const router = express.Router()

const app = express()
const port = process.env.PORT || 3000

const db = mongoose.connection
const localUrl = 'mongodb://127.0.0.1:27017/upandcoming'

const url = 'mongodb+srv://vegautam:Mongo314209!@cluster0.dn9qy.mongodb.net/volunteerio?retryWrites=true&w=majority'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

router.get('/', function (req, res) {
    console.log("sup")
})

const eventsRouter = require('./routes/events.js')
app.use('/events', eventsRouter);

const authRouter = require('./routes/auth.js')
app.use('/auth', authRouter)

const profileRouter = require('./routes/profile.js')
app.use('/profile', profileRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})