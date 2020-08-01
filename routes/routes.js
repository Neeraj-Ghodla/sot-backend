const express = require("express");
const router = express.Router();
const axios = require("axios");
const parseString = require("xml2js").parseString;

const url = `http://www.zenbu.co.nz/findnearest.xml`;

router.get("/", async (req, res) => {
  const lon = req.query.lon;
  const lat = req.query.lat;
  const { data } = await axios.get(url, {
    params: {
      x: lon,
      y: lat,
      key: process.env.API_KEY,
    },
  });
  parseString(data, (err, result) => {
    if (err) res.json({ msg: err });
    try {
      res.json(result["zenbu"]["entries"][0]["entry"]);
    } catch (err) {
      res.json([]);
    }
  });
});

module.exports = router;
