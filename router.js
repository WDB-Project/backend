const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.get('/', function (req, res) {
    // root path
})

router.route('/login')
    .get((req, res) => {
        res.send(
            // account info
        )
    })
    .port((req, res) => {
        // create account
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
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})