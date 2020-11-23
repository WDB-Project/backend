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


router.route('/events')
    .get((req, res) => {
        // list all events
    })

router.route('/signup')
    .get((req, res) => {
        // get a list of future events
    })
    .post((req, res) => {
        // sign up for a particular event
    })

router.route('/create')
    .post((req, res) => {
        // create a particular event
    })
    .post((req, res) => {
        // close an event
    })
    .delete((req, res) => {
        // delete an event
    })

app.use('/', router);

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})