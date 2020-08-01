const express = require("express");
const router = express.Router();
const axios = require("axios");
const parseString = require("xml2js").parseString;
require("dotenv").config();

const url = `http://www.zenbu.co.nz/findnearest.xml`;

router.get("/", async (req, res) => {
  const lon = req.query.lon;
  const lat = req.query.lat;

  const { data: restaurantData } = await axios.get(url, {
    params: {
      x: lon,
      y: lat,
      q: "restaurant",
      key: process.env.API_KEY,
    },
  });

  const { data: cafeData } = await axios.get(url, {
    params: {
      x: lon,
      y: lat,
      q: "cafe",
      key: process.env.API_KEY,
    },
  });

  data = [];

  parseString(restaurantData, (err, result) => {
    if (err) res.json({ status: "error converting xml to json", data: [] });
    try {
      data = [...data, ...result["zenbu"]["entries"][0]["entry"]];
    } catch (err) {
      res.json({ status: "no data available", data: [] });
    }
  });

  parseString(cafeData, (err, result) => {
    if (err) res.json({ status: "error converting xml to json", data: [] });
    try {
      data = [...data, ...result["zenbu"]["entries"][0]["entry"]];
    } catch (err) {
      res.json({ status: "no data available", data: [] });
    }
  });

  // get the random index
  const index = Math.floor(Math.random() * data.length);

  // add the fake data
  data[index]["review"] =
    "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
  data[index]["price"] = Math.floor(1 + Math.random() * 3);
  data[index]["rating"] = (1 + Math.random() * 4).toFixed(1);

  res.json({
    status: "okay",
    data: data[index],
  });
});

module.exports = router;
