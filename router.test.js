const axios = require('axios')

var events = undefined

axios.get('http://localhost:3030/events/get/')
    .then(function (response) {
        events = response.data
    })
    .catch(function (error) {
        console.log(error)
    })

console.log(events)