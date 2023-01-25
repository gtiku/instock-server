const express = require("express");
const router = express.Router();
const fs = require("fs");
const warehouses = require("../data/warehouses.json");

// GET WAREHOUSES
router.get("/", (req, res, next) => {
  res.status(201).json();
});

router.get("/", (req, res) => {
  const readWarehouses = fs.readFileSync("../data/warehouses.json");
  const warehouses = JSON.parse(readWarehouses);
  res.json(warehouses);
});

module.exports = router;
