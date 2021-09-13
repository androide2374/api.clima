const express = require('express')
const location = express.Router()

const axios = require('axios')

location.get('/location/:ip', async (req, response) => {
  const res = await axios.get(`http://ip-api.com/json/${req.params.ip}`)

  response.setHeader('Content-Type', 'application/json')
  response.send(JSON.stringify(res.data))
})

// // GetLocationIp.get('/GetWeatherIp/', async (req, res) => {
// //   const dataip = await axios.get('http://ip-api.com/json/')
// //   const { lon, lat } = dataip.data

// //   console.log({ lon, lat })

// //   try {
// //     const weatherdata = await axios.get(
// //       `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=1&appid=${API_KEY_WEATHER}`
// //     )
// //     const data = weatherdata.data

// //     const { list } = data

// //     console.log(list)

// //     res.setHeader('Content-Type', 'application/json')

// //     res.status(200).json(data)
// //   } catch (error) {
// //     res.status(404)
// //     console.log(error)
// //   }
// // })

// // GetLocationIp.get('/GetWeatherIp/:city', async (req, res) => {
// //   const { city } = req.params

// //   const weatherdata = await axios
// //     .get(
// //       `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}`
// //     )
// //     .catch((error) => res.status(404).json(error))
// //   if (weatherdata) {
// //     const { data } = weatherdata
// //     if (data.cod === 200) {
// //       res.setHeader('Content-Type', 'application/json')
// //       res.status(200).json(data)
// //     }
// //   }
// //   // } catch (error) {
// //   //   res.status(404).end(JSON.stringify(error.message))
// //   // }
// })

module.exports = location
