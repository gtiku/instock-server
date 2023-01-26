const express = require("express");
const router = express.Router();
const fs = require("fs");
// const warehouses = require("../data/warehouses.json");
const warehouseController = require("../controllers/warehouseController");

// GET WAREHOUSES (KNEX)
router.route("/").get(warehouseController.index);

//GET SINGLE WAREHOUSE
router.get("/:id", (req, res) => {
  const warehouseList = JSON.parse(fs.readFileSync("./data/warehouses.json"));

  res.json(warehouseList.find((warehouse) => req.params.id === warehouse.id));
});

module.exports = router;
