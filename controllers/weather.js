const express = require('express')
const weather = express.Router()

const axios = require('axios')
const API_KEY_WEATHER =
  process.env.API_KEY || '212b49dc91ea1c61dad9b96abb1c004d'

weather.get('/current/:city?', async (req, res) => {
  let city = null
  console.log(req.params.city)
  if (req.params.city) {
    city = req.params.city
  } else {
    console.log('Get city ip')
    const response = await axios.get('http://ip-api.com/json/')
    city = response.data.city
  }
  await axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}`
    )
    .then((response) => {
      if (response.data.cod === 200) {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(response.data)
      }
    })
    .catch((error) => res.status(404).json(error))
})

// weather.get('/forecast/:city ', (req, res) => {
//   if (req.params.city) {
//   }
// })

module.exports = weather
