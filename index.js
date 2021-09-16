const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/v1', require('./routes/weather.routes'))
app.use('/v1', require('./routes/location.routes'))

app.use((request, response) => {
  response.status(404).json({ error: `EndPoint no encontrado ${request.path}` })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
