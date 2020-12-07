const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const router = express.Router()

const app = express()
const port = process.env.PORT || 3000

const db = mongoose.connection

const cors = require('cors')

app.use(cors())
app.options('*', cors()) // Allow options on all resources

const localUrl = 'mongodb://127.0.0.1:27017/upandcoming'
const url = 'mongodb+srv://WDB-Buddies:wdb123@cluster0.dn9qy.mongodb.net/volunteerio?retryWrites=true&w=majority'
// const url = "mongodb://127.0.0.1:27017/upandcoming"

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

<<<<<<< Updated upstream:server.js
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
=======
  
mongoose.connect(localUrl, { useUnifiedTopology: true, useNewUrlParser: true })
>>>>>>> Stashed changes:router.js

router.get('/', function (req, res) {
    res.json({hello : "hello"})
})

app.use("/", router)

const eventsRouter = require('./routes/events.js')
app.use('/events', eventsRouter);

const authRouter = require('./routes/auth.js')
app.use('/auth', authRouter)

const profileRouter = require('./routes/profile.js')
app.use('/profile', profileRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})