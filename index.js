// const http =  require('http')
const express = require("express")

const app = express()

const axios = require("axios")
const cities = require("./ciudades.json")

app.get("/api/city", (request, response) => {
  response.setHeader('Content-Type', 'application/json')
  response.status(200).send(cities)
})

app.get("/api/city/:id", (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  if (!id) {
    response.status(204).end('error')
  }
  else{
    response.setHeader('Content-Type', 'application/json').status(200).send(cities.filter((city) => city.id === id))
  }
})

app.get("/api/GetLocationIp/:ip", async (request, response) => {

  const res = await axios.get(
    `http://ip-api.com/json/${request.params.ip}`
  )

  const { country, regionName, city } = res.data

  response.setHeader('Content-Type', 'application/json')

  response.send(JSON.stringify({ country, regionName, city }))
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
