const express = require('express')
const route = express.Router()
const getLocation = require('../controllers/getLocationIp')

// route.get('/current/:city?', current.getCurrent)

// route.get('/forecast/:city?')
route.get('/location/', getLocation)

module.exports = route
