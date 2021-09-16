const axios = require('axios')

const getLocation = async (req, response) => {
  const res = await axios.get('http://ip-api.com/json/')

  response.setHeader('Content-Type', 'application/json')
  response.send(JSON.stringify(res.data))
}

module.exports = getLocation
