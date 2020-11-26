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


//temporary way to get events for frontend, prolly need a more robust way to get events than using the name
router.route('/get')
    .get((req, res) => {
        const name = req.body.name
        Event.findOne({"name" : name}, (err, Event) => {
            if (err) console.log(err)
            res.json(Event)
        })
    })
module.exports = router


