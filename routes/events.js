const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Event = require('../models/Event');

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


module.exports = router

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
    
    
module.exports = router
