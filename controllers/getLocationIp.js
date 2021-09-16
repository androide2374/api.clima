const express = require('express')
const location = express.Router()

const axios = require('axios')

location.get('/location/', async (req, response) => {
  const res = await axios.get('http://ip-api.com/json/')

  response.setHeader('Content-Type', 'application/json')
  response.send(JSON.stringify(res.data))
})

module.exports = location
