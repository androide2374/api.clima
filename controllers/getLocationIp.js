const express = require('express')
const GetLocationIp = express.Router()

const axios = require('axios')

GetLocationIp.get('/GetLocationIp/:ip', async (request, response) => {
  const res = await axios.get(`http://ip-api.com/json/${request.params.ip}`)
  const { regionName, city } = res.data
  response.setHeader('Content-Type', 'application/json')
  response.send(JSON.stringify({ city: city + ', ' + regionName }))
})

module.exports = GetLocationIp
