const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Event = require('../models/Event');

router.route('/create')
    .put(function (req, res, next) { // create event
        const event = new Event(req.body);
        event.save(function (err, Event) {
            if (err) console.log(err);
        });
        res.send(`${req.body.name} updated successfully`)
    })


//temporary reqs for backend, can be improved
//get event
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
    
    
module.exports = router
