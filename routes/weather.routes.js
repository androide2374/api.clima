const express = require('express')
const route = express.Router()
const current = require('../controllers/weather')

route.get('/current/:city?', current.getCurrent)
route.get('/forecast/:city?', current.getForecast)

module.exports = route
