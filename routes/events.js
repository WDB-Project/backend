const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Event = require('../models/Event');

// TODO: save this secret in some environment variable that isn't public (or obfuscate code)
const secretKey = "randomSecretVal"

router.use('/create', verifyAuthToken)
router.use('/add_volunteer', verifyAuthToken)


router.route('/create')
    .put(function (req, res, next) { // create event
        
        const event = new Event({
            name: req.body.name,
            subtitle: req.body.subtitle,
            description: req.body.description,
            startDate: Date.parse(req.body.startDate),
            endDate: Date.parse(req.body.endDate),
            volunteers: req.body.volunteers
        });

        event.save(function (err, Event) {
            if (err) {console.log(err)};
        });

        res.send(`${req.body.name} updated successfully`)
    })


router.route('/get')
    .get((req, res) => {
    
        let searchParams = {}

        if ('name' in req.query) {
            searchParams['name'] = req.query.name
        }

        if ('startDate' in req.query) {
            searchParams['startDate'] = {$gt: Date.parse(req.query.startDate)}
        } else {
            searchParams['startDate'] = {$gt: Date.now()}
        }

        if ('endDate' in req.query) {
            searchParams['endDate'] = {$lt: Date.parse(req.query.endDate)}
        }

        if ('all' in req.query & req.query['all'] == "true") {
            delete searchParams['startDate'], searchParams['endDate']
        }        

        Event.find(searchParams, (err, Event) => {
            if (err) {console.log(err)};
            res.json(Event)
        })
    })


// temp
router.route('/get')
    .post((req, res) => {
        const eventID = req.body.id
        Event.findOne({"_id" : eventID}, (err, Event) => {
            if (err) console.log(err)
            res.json(Event)
        })
    })

//add volunteers
router.route('/add_volunteer')
    .put((req, res) => {
        var eventID = req.body.id,  volunteers = req.body.volunteers
        Event.findOneAndUpdate({'_id' : eventID}, {'volunteers': volunteers}, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.json(result)
            }
        })
    })

// middleware function that can be added to each route where a user is required (then inside the route you can access the user and check their account)
// on postman, send in the auth token in the form "Bearer <token>" in the request headers
function verifyAuthToken(req, res, next) {
    const tokenString = req.headers['authorization']
    if (tokenString) {
        const token = tokenString.split(' ')[1]
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
              return res.sendStatus(403)
            } 
            req.user = user
            next() 
          })
    } else {
        return res.sendStatus(403)
    }
}

module.exports = router
