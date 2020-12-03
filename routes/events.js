const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Event = require('../models/Event');
const jwt = require('jsonwebtoken')
// TODO: save this secret in some environment variable that isn't public (or obfuscate code)
const secretKey = "randomSecretVal"

// router.use('/create', verifyAuthToken)
// router.use('/add_volunteer', verifyAuthToken)

router.route('/create')
    .post(function (req, res, next) { // create event
        
        const attributes = req.body

        if (attributes['startDate']) attributes['startDate'] = Date.parse(req.body.startDate)
        if (attributes['startDate']) attributes['endDate'] = Date.parse(req.body.endDate)

        const event = new Event(attributes);

        event.save(function (err, Event) {
            if (err) {
                res.send(err)
                console.log(err)
            } else {
                res.send(`${req.body.name} updated successfully`)
            }
        });
    })

// Return events
router.route('/get')
    .get((req, res) => {
        Event.find(req.query, (err, Event) => {
            if (err) {
                console.log(err)
                res.sendStatus(404)
            } else if (Event.length == 1) {
                console.log(`Single value for ID: ${Event[0]._id}`)
                res.json(Event)
            } else {
                const currentDate = Date.now()
                const allEvents = {
                    upcoming: [],
                    ongoing: [],
                    past: []
                }
                for (const event of Event) {
                    if (event.startDate > currentDate) {
                        allEvents.upcoming.push(event)
                    } else if (event.endDate > currentDate) {
                        allEvents.ongoing.push(event)
                    } else {
                        allEvents.past.push(event)
                    }
                }
                res.json(allEvents)
            }
        })
    })

// Volunteer signup
router.route('/signup')
    .put((req, res) => {
        var eventID = req.body.id
        var volunteers = req.body.volunteers
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
