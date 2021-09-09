const express = require('express')
const city = express.Router()

const cities = require('../ciudades.json')

city.get('/city', (request, response) => {
  response.setHeader('Content-Type', 'application/json')
  response.status(200).send(cities)
})

city.get('/city/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  if (!id) {
    response.status(204).end('error')
  } else {
    response.setHeader('Content-Type', 'application/json')
    response.status(200).send(cities.filter((city) => city.id === id))
  }
})

module.exports = city
