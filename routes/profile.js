const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const Event = require('../models/Event')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// TODO: save this secret in some environment variable that isn't public (or obfuscate code)
const secretKey = "randomSecretVal"

router.use(verifyAuthToken)

router.route('/basic')
    .get((req, res) => {
        User.findById(req.user.uid, (err, userProfile) => {
            if (err) res.json(err)
            res.json(userProfile)
        })
    }
)

//user joins event
router.route('/join')
    .put((req, res) => {
        User.findByIdAndUpdate(req.body.id, {$push: {'events': req.body.event}}, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.json(result)
            }
        })
    })

router.route("/leave")
    .put((req, res) => {
        User.findByIdAndUpdate(req.body.id, {$pullAll : {"events": [req.body.event]}}, (err, result) => {
            if (err) { 
                res.send(err)
            } else {
                res.json(result)
            }
        })
    })


router.route('/get_events')
    .get((req, res) => {
        User.findById(req.query.id, (err, userProfile) => {
            const currentDate = Date.now()
            const allEvents = {
                upcoming: [],
                ongoing: [],
                past: []
            }
            Event.find({'_id': { $in: userProfile.events}}, (err, Events) => {
                for (const event of Events) {
                    if (event.startDate > currentDate) {
                        allEvents.upcoming.push(event)
                    } else if (event.endDate > currentDate) {
                        allEvents.ongoing.push(event)
                    } else {
                        allEvents.past.push(event)
                    }
                }
                res.json(allEvents)
            })
            
        })
    })

router.route("/create")
    .put((req, res) => {
        User.findByIdAndUpdate(req.body.id, {$push: {"myEvents": req.body.event}}, (err, userProfile) => {
            if (err) {
                res.send(err)
            } else {
                res.json(userProfile)
            }
        })
    })

router.route("/get_myevents")
    .get((req, res) => {
        User.findById(req.query.id, (err, user) => {
            Event.find({'_id': {$in: user.myEvents}}, (err, Events) => {
                if (err) {
                    res.send(err)
                } else {
                    res.json(Events)
                }
            })
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
