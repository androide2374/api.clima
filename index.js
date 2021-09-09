// const http =  require('http')
const express = require("express");

const app = express();

const axios = require("axios");
const citys = require("./ciudades.json");

app.get("/api/city", (request, response) => {
  response.json(citys);
});

app.get("/api/city/:id", (request, response) => {
  const { id } = request.params;

  response.json(citys.filter((city) => city.id === parseInt(id)));
});

app.get("/api/GetLocationIp/:ip", async (request, response) => {
  const res = await axios.get(
    `http://ip-api.com/json/${request.params.ip}`
  );
  const { country, regionName, city } = res.data
  response.send(JSON.stringify({ country, regionName, city }));
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
