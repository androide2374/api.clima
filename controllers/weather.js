const express = require('express')
const weather = express.Router()

const ciudades = require('../ciudades.json')

const axios = require('axios')
const API_KEY_WEATHER =
  process.env.API_KEY || '212b49dc91ea1c61dad9b96abb1c004d'
const PORT = process.env.PORT || 3001

weather.get('/current/:city?', async (req, res) => {
  let coords = {}

  if (req.params.city) {
    coords = ciudades[req.params.city]
    console.log('--current by city param--')
  } else {
    console.log('--current by city ip--')
    const response = await axios.get(`http://localhost:${PORT}/v1/location`)
    const { lon, lat } = response.data
    coords = { lon, lat }
  }
  // `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=hourly,minutely&appid=${API_KEY_WEATHER}&units=metric`
  console.log('--initial current request--')

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY_WEATHER}&units=metric`
  )

  if (response.data) {
    console.log('--current response ok --')

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(response.data)
  } else {
    console.log('--current response error --')

    res.status(404).json(response)
  }
})

weather.get('/forecast/:city?', async (req, res) => {
  let coords = {}
  let scity = ''

  if (req.params.city) {
    coords = ciudades[req.params.city]
    scity = req.params.city
    console.log('--current by city param--')
  } else {
    console.log('--current by city ip--')
    const response = await axios.get(`http://localhost:${PORT}/v1/location`)
    const { lon, lat, city } = response.data
    scity = city
    coords = { lon, lat }
  }
  console.log('--initial current request--')

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=hourly,minutely&appid=${API_KEY_WEATHER}&units=metric`
  )

  if (response.data) {
    console.log('--current response ok --')
    const { daily, lat, lon } = response.data
    const forecast = daily.slice(1, 6)

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ forecast, lat, lon, scity })
  } else {
    console.log('--current response error --')

    res.status(404).json(response)
  }
})

module.exports = weather
