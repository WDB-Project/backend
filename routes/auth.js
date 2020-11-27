const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// TODO: save this secret in some environment variable that isn't public (or obfuscate code)
const secretKey = "randomSecretVal"

router.route('/register')
    .post((req, res) => {
        bcrypt.hash(req.body.password, saltRounds, function(err, hashedPwd) {
            if (err) {
                res.json({error: err, message: "encryption error"})
            }
            else {
                const user = new User({
                    username: req.body.username,
                    password: hashedPwd,
                    realname: req.body.realname,
                    email: req.body.email
                })

                user.save((err)=>{
                    if (err){
                        res.json({error: err, message: ""})
                    }else{
                        res.redirect('./login');
                    }
    
                });
            }
        })
        
    }
)

router.route('/login')
    .post((req, res) => {
        const password = req.body.password
        User.findOne({ username: req.body.username}, function (err, user) {
            if (err) {
                res.json({error: err})
            } else {
                hashedPwd = user.password
                bcrypt.compare(req.body.password, hashedPwd, function(err, correct) {
                    if (err) {
                        res.json({error: err})
                    } else {
                        if (correct) {
                            jwt.sign({uid: user.id}, secretKey, (err, token) => {
                                res.json({message: "Success!", token: token})
                            })
                        } else {
                            res.json({error: "Incorrect Password!"})
                        }
                    }
                });
            }
        });
        
    }
)



module.exports = router
