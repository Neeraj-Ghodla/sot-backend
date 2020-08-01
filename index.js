const express = require("express");
const axios = require("axios");
let xmlParser = require("xml2json");

// initialize the app
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// routes
app.get("/", async (req, res) => {
  const url =
    "http://www.zenbu.co.nz/search.xml?q=wellington+cafe&key=eddee0cb5be8a423780a5eaae551ba80e24a5024";
  const { data } = await axios.get(url);
  const jsonData = await xmlParser.toJson(data, { object: true });
  res.json(jsonData);
});

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
