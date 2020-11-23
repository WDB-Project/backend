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

module.exports = router


