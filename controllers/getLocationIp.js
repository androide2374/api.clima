const express = require('express')
const GetLocationIp = express.Router()

const axios = require('axios')

const API_KEY_WEATHER =
  process.env.API_KEY || '212b49dc91ea1c61dad9b96abb1c004d'

GetLocationIp.get('/GetLocationIp/:ip', async (request, response) => {
  const res = await axios.get('http://ip-api.com/json/')
  // const { regionName, city } = res.data
  response.setHeader('Content-Type', 'application/json')
  response.send(JSON.stringify(res.data))
})

GetLocationIp.get('/GetWeatherIp/', async (req, res) => {
  const dataip = await axios.get('http://ip-api.com/json/')
  const { lon, lat } = dataip.data

  console.log({ lon, lat })

  try {
    const weatherdata = await axios.get(
      `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=1&appid=${API_KEY_WEATHER}`
    )
    const data = weatherdata.data

    const { list } = data

    console.log(list)

    res.setHeader('Content-Type', 'application/json')

    res.status(200).json(data)
  } catch (error) {
    res.status(404)
    console.log(error)
  }
})

module.exports = GetLocationIp
