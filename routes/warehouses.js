const express = require("express");
const router = express.Router();
const fs = require("fs");

// GET WAREHOUSES
router.get("/", (req, res, next) => {
  res.status(201).json();
});

//GET SINGLE WAREHOUSE
router.get("/:id", (req, res) => {
  const warehouseList = JSON.parse(
    fs.readFileSync("./data/warehouses.json")
  );

  res.json(
    warehouseList.find((warehouse) => req.params.id === warehouse.id)
  );
});

module.exports = router;
